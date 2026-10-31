"""Auth router — register, login, me"""
from datetime import timedelta
import re
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.models.db_models import get_db, User, Organization, AuditLog
from app.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str
    role: str = "DONOR"
    phone: str = ""
    organization_name: str = ""
    subtype: str = ""
    registration_id: str = ""


class OrgCreate(BaseModel):
    name: str
    organization_type: str
    address: str = ""
    latitude: float = None
    longitude: float = None
    subtype: str = ""
    registration_id: str = ""


DONOR_TYPES = {"individual", "restaurant", "hotel", "caterer", "mess", "corporate_kitchen", "event_venue", "other"}
RECIPIENT_TYPES = {"orphanage", "adult_shelter", "gaushala", "food_bank", "other"}


def _valid_registration_id(value: str) -> bool:
    return bool(re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9/-]{3,39}", (value or "").strip()))


@router.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    email = req.email.strip().lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(400, "Email already registered")
    # Operational privilege is provisioned out of band; public signup is limited to community roles.
    allowed_roles = ["DONOR", "RECIPIENT", "LOGISTICS", "PROCESSOR"]
    if req.role not in allowed_roles:
        raise HTTPException(400, f"Invalid role. Choose from: {allowed_roles}")
    if req.role == "RECIPIENT":
        if not req.organization_name.strip() or not _valid_registration_id(req.registration_id):
            raise HTTPException(422, "Recipient accounts require an organization name and a valid registration ID (4–40 letters, numbers, / or -).")
        if req.subtype not in RECIPIENT_TYPES:
            raise HTTPException(422, "Choose a valid recipient organization type.")
    elif req.role == "DONOR":
        if not req.organization_name.strip() or req.subtype not in DONOR_TYPES:
            raise HTTPException(422, "Donor accounts require a donor type and account name.")
    elif req.role == "PROCESSOR":
        if not req.organization_name.strip() or req.subtype != "compost_unit":
            raise HTTPException(422, "Compost Unit accounts require a unit name.")
    user = User(
        full_name=req.full_name,
        email=email,
        hashed_password=hash_password(req.password),
        role=req.role,
        phone=req.phone,
    )
    db.add(user)
    if req.organization_name.strip():
        organization = Organization(
            name=req.organization_name.strip(),
            organization_type=req.role,
            verification_status="PENDING" if req.role == "RECIPIENT" else "VERIFIED",
            metadata_={
                "portal_type": req.subtype,
                "registration_id": req.registration_id.strip() or None,
            },
        )
        db.add(organization)
        db.flush()
        user.organization_id = organization.id
    db.commit()
    db.refresh(user)
    token = create_access_token({"sub": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "user": _user_dict(user)}


@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form.username.strip().lower()).first()
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(401, "Invalid credentials")
    token = create_access_token({"sub": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "user": _user_dict(user)}


@router.get("/me")
def me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    org = None
    if current_user.organization_id:
        org = db.query(Organization).filter(Organization.id == current_user.organization_id).first()
    return {**_user_dict(current_user), "organization": _org_dict(org) if org else None}


@router.post("/create-organization")
def create_org(org: OrgCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if org.organization_type != current_user.role:
        raise HTTPException(403, "Organization type must match the signed-in account role.")
    if current_user.role == "RECIPIENT" and not _valid_registration_id(org.registration_id):
        raise HTTPException(422, "Recipients require a valid organization registration ID.")
    new_org = Organization(
        name=org.name,
        organization_type=org.organization_type,
        address=org.address,
        latitude=org.latitude,
        longitude=org.longitude,
        verification_status="PENDING" if current_user.role == "RECIPIENT" else "VERIFIED",
        metadata_={
            "portal_type": org.subtype,
            "registration_id": org.registration_id.strip() or None,
        },
    )
    db.add(new_org)
    db.flush()
    current_user.organization_id = new_org.id
    db.commit()
    db.refresh(new_org)
    return _org_dict(new_org)


def _user_dict(u: User):
    return {
        "id": u.id, "full_name": u.full_name, "email": u.email,
        "role": u.role, "phone": u.phone,
        "organization_id": u.organization_id,
        "created_at": u.created_at.isoformat() if u.created_at else None
    }

def _org_dict(o: Organization):
    if not o: return None
    return {
        "id": o.id, "name": o.name, "organization_type": o.organization_type,
        "address": o.address, "latitude": o.latitude, "longitude": o.longitude,
        "verification_status": o.verification_status,
        "metadata": o.metadata_ or {},
        "created_at": o.created_at.isoformat() if o.created_at else None
    }

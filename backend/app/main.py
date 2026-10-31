"""
POTBHAR FastAPI Main Application
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.models.db_models import create_tables
from app.routers.auth import router as auth_router
from app.routers.food_batches import router as batches_router
from app.routers.live_workflows import router as live_workflows_router
from app.routers.all_routers import (
    orgs_router, reqs_router, match_router,
    delivery_router, waste_router, analytics_router
)

app = FastAPI(
    title="POTBHAR API",
    description="AI-Powered Food Recovery, Quality Assessment & Organic Waste Management",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS for React frontend
allowed_origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=os.getenv("FRONTEND_ORIGIN_REGEX", r"https://[a-z0-9-]+\.netlify\.app"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routers
PREFIX = "/api/v1"
app.include_router(auth_router, prefix=PREFIX)
app.include_router(batches_router, prefix=PREFIX)
app.include_router(live_workflows_router, prefix=PREFIX)
app.include_router(orgs_router, prefix=PREFIX)
app.include_router(reqs_router, prefix=PREFIX)
app.include_router(match_router, prefix=PREFIX)
app.include_router(delivery_router, prefix=PREFIX)
app.include_router(waste_router, prefix=PREFIX)
app.include_router(analytics_router, prefix=PREFIX)

# Serve uploaded images
os.makedirs("uploads/food_images", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.on_event("startup")
def startup():
    create_tables()
    _seed_demo_data()
    print("[OK] POTBHAR API started. Visit http://localhost:8000/docs")


@app.get("/")
def root():
    return {
        "name": "POTBHAR API",
        "tagline": "Har Pet Bhare, Har Nivala Sambhale",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }


@app.get("/api/v1/health")
def health():
    return {"status": "healthy", "service": "POTBHAR"}


def _seed_demo_data():
    """Seed demo data on first run."""
    from app.models.db_models import SessionLocal, User, Organization
    from app.auth import hash_password
    db = SessionLocal()
    try:
        existing_users = db.query(User).count()
        if existing_users > 0:
            # Older databases may already have users but be missing newer demo roles.
            org_specs = [
                ("Green Feast Caterers", "DONOR", "Connaught Place, New Delhi"),
                ("Asha NGO - Food Bank", "RECIPIENT", "Lajpat Nagar, New Delhi"),
                ("EcoCompost Delhi", "PROCESSOR", "Okhla Industrial Area, New Delhi"),
            ]
            demo_orgs = {}
            for name, org_type, address in org_specs:
                org = db.query(Organization).filter(Organization.name == name).first()
                if not org:
                    org = Organization(
                        name=name,
                        organization_type=org_type,
                        address=address,
                        verification_status="VERIFIED",
                    )
                    db.add(org)
                    db.flush()
                demo_orgs[name] = org

            demo_users = [
                ("Ravi Sharma", "donor@potbhar.demo", "DONOR", demo_orgs["Green Feast Caterers"].id, ""),
                ("Vikram Shinde", "rider@potbhar.demo", "LOGISTICS", None, "+91 98220 11223"),
                ("Priya Nair", "recipient@potbhar.demo", "RECIPIENT", demo_orgs["Asha NGO - Food Bank"].id, ""),
                ("Dr. Ananya Verma", "assessor@potbhar.demo", "ASSESSOR", demo_orgs["Green Feast Caterers"].id, ""),
                ("Suresh Kumar", "admin@potbhar.demo", "ADMIN", None, ""),
                ("EcoProcessor", "processor@potbhar.demo", "PROCESSOR", demo_orgs["EcoCompost Delhi"].id, ""),
            ]
            for full_name, email, role, organization_id, phone in demo_users:
                user = db.query(User).filter(User.email == email).first()
                if not user:
                    user = User(email=email)
                    db.add(user)
                # Keep the advertised demo password and persona predictable on older DBs.
                user.full_name = full_name
                user.hashed_password = hash_password("demo123")
                user.role = role
                user.organization_id = organization_id
                user.phone = phone or None
                user.is_active = True
            db.commit()
            return  # Already seeded

        # Create demo organizations
        orgs = [
            Organization(name="Green Feast Caterers", organization_type="DONOR", address="Connaught Place, New Delhi",
                         latitude=28.6315, longitude=77.2167, verification_status="VERIFIED"),
            Organization(name="Asha NGO - Food Bank", organization_type="RECIPIENT", address="Lajpat Nagar, New Delhi",
                         latitude=28.5700, longitude=77.2400, verification_status="VERIFIED", service_area_radius_km=20),
            Organization(name="EcoCompost Delhi", organization_type="PROCESSOR", address="Okhla Industrial Area, New Delhi",
                         latitude=28.5350, longitude=77.2710, verification_status="VERIFIED", service_area_radius_km=30),
            Organization(name="Nourish Foundation", organization_type="RECIPIENT", address="Karol Bagh, New Delhi",
                         latitude=28.6517, longitude=77.1887, verification_status="VERIFIED", service_area_radius_km=15),
        ]
        for o in orgs:
            db.add(o)
        db.flush()

        # Create demo users
        users = [
            User(full_name="Ravi Sharma", email="donor@potbhar.demo", hashed_password=hash_password("demo123"),
                 role="DONOR", organization_id=orgs[0].id),
            User(full_name="Vikram Shinde", email="rider@potbhar.demo", hashed_password=hash_password("demo123"),
                 role="LOGISTICS", phone="+91 98220 11223"),
            User(full_name="Priya Nair", email="recipient@potbhar.demo", hashed_password=hash_password("demo123"),
                 role="RECIPIENT", organization_id=orgs[1].id),
            User(full_name="Dr. Ananya Verma", email="assessor@potbhar.demo", hashed_password=hash_password("demo123"),
                 role="ASSESSOR", organization_id=orgs[0].id),
            User(full_name="Suresh Kumar", email="admin@potbhar.demo", hashed_password=hash_password("demo123"),
                 role="ADMIN"),
            User(full_name="EcoProcessor", email="processor@potbhar.demo", hashed_password=hash_password("demo123"),
                 role="PROCESSOR", organization_id=orgs[2].id),
        ]
        for u in users:
            db.add(u)
        db.flush()

        # Create recipient requirements
        from app.models.db_models import RecipientRequirement
        reqs = [
            RecipientRequirement(recipient_id=orgs[1].id, food_category="Biryani",
                                  quantity_needed_kg=30, capacity_kg=50, status="ACTIVE"),
            RecipientRequirement(recipient_id=orgs[1].id, food_category="Dal",
                                  quantity_needed_kg=15, capacity_kg=25, status="ACTIVE"),
            RecipientRequirement(recipient_id=orgs[3].id, food_category="Cooked Rice",
                                  quantity_needed_kg=20, capacity_kg=40, status="ACTIVE"),
        ]
        for r in reqs:
            db.add(r)

        db.commit()
        print("[OK] Demo data seeded. Login: donor@potbhar.demo / demo123")
        print("     Also: assessor@potbhar.demo, recipient@potbhar.demo, admin@potbhar.demo (all: demo123)")

    except Exception as e:
        print(f"[WARN] Seed error (may already be seeded): {e}")
        db.rollback()
    finally:
        db.close()

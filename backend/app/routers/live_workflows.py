"""Shared, persistent workflow board used by all PotBhar workspaces."""
from datetime import datetime
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session, joinedload

from app.auth import get_current_user
from app.models.db_models import LiveWorkflow, User, get_db

router = APIRouter(prefix="/live-workflows", tags=["Live portal workflows"])


class WorkflowCreate(BaseModel):
    data: dict[str, Any] = Field(default_factory=dict)


class WorkflowUpdate(BaseModel):
    status: str
    updates: dict[str, Any] = Field(default_factory=dict)


def _serialize(record: LiveWorkflow):
    return {
        "id": record.id,
        "data": record.data or {},
        "status": record.status,
        "created_at": record.created_at.isoformat() if record.created_at else None,
        "updated_at": record.updated_at.isoformat() if record.updated_at else None,
        "donor": record.donor.full_name if record.donor else "PotBhar Donor",
    }


@router.get("/")
def list_workflows(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(LiveWorkflow).options(joinedload(LiveWorkflow.donor))
    if current_user.role == "DONOR":
        query = query.filter(LiveWorkflow.donor_id == current_user.id)
    elif current_user.role == "PROCESSOR":
        query = query.filter(LiveWorkflow.status.in_(["COMPOST_NEEDED", "COMPOST_RECEIVED", "COMPOSTED"]))
    elif current_user.role == "LOGISTICS":
        query = query.filter(LiveWorkflow.status.in_(["CLAIMED", "PICKED_UP", "DELIVERED"]))
    return [_serialize(row) for row in query.order_by(LiveWorkflow.created_at.desc()).limit(200).all()]


@router.post("/", status_code=201)
def create_workflow(payload: WorkflowCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "DONOR":
        raise HTTPException(403, "Only donor accounts can publish a food offer")
    if not str(payload.data.get("food") or "").strip():
        raise HTTPException(422, "Food description is required")
    try:
        quantity = float(payload.data.get("quantityKg", 0))
    except (TypeError, ValueError):
        quantity = 0
    if quantity <= 0:
        raise HTTPException(422, "Quantity must be greater than zero")
    initial_status = "COMPOST_NEEDED" if payload.data.get("destinationType") == "compost" else "AVAILABLE"
    record = LiveWorkflow(donor_id=current_user.id, data=payload.data, status=initial_status)
    db.add(record)
    db.commit()
    db.refresh(record)
    return _serialize(record)


@router.patch("/{workflow_id}")
def update_workflow(workflow_id: str, payload: WorkflowUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    record = db.query(LiveWorkflow).options(joinedload(LiveWorkflow.donor)).filter(LiveWorkflow.id == workflow_id).with_for_update().first()
    if not record:
        raise HTTPException(404, "Food offer not found")

    transitions = {
        "RECIPIENT": {"AVAILABLE": {"CLAIMED"}, "CLAIMED": {"ACCEPTED", "COMPOST_NEEDED"}},
        "LOGISTICS": {"CLAIMED": {"PICKED_UP"}, "PICKED_UP": {"DELIVERED"}},
        "PROCESSOR": {"COMPOST_NEEDED": {"COMPOST_RECEIVED"}, "COMPOST_RECEIVED": {"COMPOSTED"}},
        "DONOR": {"AVAILABLE": {"CANCELLED"}, "CLAIMED": {"DELIVERED"}},
    }
    if current_user.role == "ADMIN":
        allowed = True
    elif current_user.role == "DONOR" and record.donor_id == current_user.id:
        allowed = payload.status in transitions["DONOR"].get(record.status, set())
        if record.status == "CLAIMED" and (record.data or {}).get("deliveryMethod") != "self":
            allowed = False
    else:
        allowed = payload.status in transitions.get(current_user.role, {}).get(record.status, set())
    if not allowed:
        raise HTTPException(403, "This workspace cannot make that workflow transition")

    record.status = payload.status
    record.data = {**(record.data or {}), **payload.updates}
    record.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(record)
    return _serialize(record)

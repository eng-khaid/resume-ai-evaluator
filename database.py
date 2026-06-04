from fastapi import FastAPI, status, HTTPException, Depends
from pydantic import BaseModel
from typing import Generator

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session

# ---------------- APP ----------------
app = FastAPI()

# ---------------- DATABASE ----------------
SQLALCHEMY_DATABASE_URL = "sqlite:///./lesson9.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# ---------------- MODEL ----------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, default="user")

# create tables
Base.metadata.create_all(bind=engine)

# ---------------- DB SESSION ----------------
def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- SCHEMAS ----------------
class UserCreate(BaseModel):
    name: str
    email: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True

# ---------------- CREATE USER ----------------
@app.post("/users", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == user_data.email).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with that email already exists"
        )

    new_user = User(
        name=user_data.name,
        email=user_data.email
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

# ---------------- GET ALL USERS ----------------
@app.get("/users", response_model=list[UserOut])
def list_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):

    users = db.query(User).offset(skip).limit(limit).all()

    return users

# ---------------- GET USER BY ID ----------------
@app.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    return user
@app.get("/users", response_model=list[UserOut])
def list_users(skip: int = 10, limit: int = 10, db: Session = Depends(get_db)):
    # .offset(skip) → skip this many rows (for pagination)
    # .limit(limit) → return at most this many rows
    # .all() → execute the query and return a Python list

    users = db.query(User).offset(skip).limit(limit).all()

    return users


@app.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    return user
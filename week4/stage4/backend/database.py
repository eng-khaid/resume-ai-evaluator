# backend/database.py
from sqlmodel import SQLModel, create_engine, Session

# مسار قاعدة بيانات المشروع الجديد
DATABASE_URL = "sqlite:///./resume_evaluator.db"

# echo=True لطباعة استعلامات SQL في التيرمنال ومراقبة ما يحدث خلف الكواليس
engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})

def create_db():
    """إنشاء جميع الجداول المعرّفة في موديلات SQLModel تلقائياً"""
    SQLModel.metadata.create_all(engine)

def get_session():
    """FastAPI Dependency - لفتح جلسة اتصال وإغلاقها تلقائياً بعد انتهاء الـ Request"""
    with Session(engine) as session:
        yield session 
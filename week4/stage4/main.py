from fastapi import FastAPI, Depends, HTTPException, status
from sqlmodel import Session, select
from database import create_db, get_session
from models import User, UserCreate
import bcrypt  # 👈 سنستخدم مكتبة bcrypt مباشرة هنا

app = FastAPI(title="Resume Evaluator - Stage 4")

@app.on_event("startup")
def on_startup():
    create_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to Stage 4 API"}

@app.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserCreate, session: Session = Depends(get_session)):
    # 1. التحقق من تكرار الإيميل
    existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    try:
        # 2. التشفير الآمن المباشر المتوافق مع بايثون الحديثة
        # نقوم بتحويل النص إلى bytes أولاً باستخدام encode()
        password_bytes = user_data.password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_pwd_bytes = bcrypt.hashpw(password_bytes, salt)
        
        # تحويل الهاش الناتج إلى نص عادي (string) لحفظه في قاعدة البيانات
        hashed_pwd_str = hashed_pwd_bytes.decode('utf-8')
        
        # 3. تجهيز كائن المستخدم الحقيقي (بدون قص الحروف ليعمل الـ login مستقبلاً)
        new_user = User(
            email=user_data.email,
            hashed_password=hashed_pwd_str,
            role="user"
        )
        
        # 4. الحفظ والتأكيد في قاعدة البيانات
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        
        return {"message": "User registered successfully", "user_id": new_user.id}
        
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")
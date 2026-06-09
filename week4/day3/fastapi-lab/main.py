from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models
import schemas

app = FastAPI(title="FastAPI Bootcamp Lab")

# إنشاء جميع الجداول تلقائياً عند تشغيل السيرفر
#Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"status": "FastAPI is running successfully!"}

# ==========================================
#  مسارات المستخدمين (Users APIs)
# ==========================================
@app.post("/users", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # التأكد من عدم تكرار الإيميل
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(name=user.name, email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ==========================================
#  مسارات المقالات (Blogs APIs)
# ==========================================
@app.post("/blogs", response_model=schemas.BlogOut)
def create_blog(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    # التأكد أولاً من أن المستخدم (user_id) موجود فعلاً في قاعدة البيانات لمنع أخطاء الربط
    db_user = db.query(models.User).filter(models.User.id == blog.user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found. Create a user first!")

    new_blog = models.Blog(
        user_id=blog.user_id,
        post=blog.post,
        description=blog.description
    )
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

@app.get("/blogs/{user_id}", response_model=list[schemas.BlogOut])
def get_blogs_by_user(user_id: int, db: Session = Depends(get_db)):
    blogs = db.query(models.Blog).filter(models.Blog.user_id == user_id).all()
    return blogs
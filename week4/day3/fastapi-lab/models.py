from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# 1. جدول المستخدمين (تمت إضافته لحل خطأ الـ Foreign Key)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    bio = Column(String, nullable=True)
    # علاقة اختيارية لربط المستخدم بمقالاته
    blogs = relationship("Blog", back_populates="owner")

# 2. جدول المقالات
class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) # يربط بـ id في جدول users
    post = Column(String)
    description = Column(String, nullable=True)
    create_date = Column(DateTime, default=datetime.utcnow)

    # علاقة اختيارية للوصول لبيانات صاحب المقال
    owner = relationship("User", back_populates="blogs")
from pydantic import BaseModel
from datetime import datetime

# مخططات إنشاء واستقبال بيانات المستخدم
class UserCreate(BaseModel):
    name: str
    email: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

# مخططات إنشاء واستقبال بيانات المقال
class BlogCreate(BaseModel):
    user_id: int
    post: str
    description: str | None = None

class BlogOut(BaseModel):
    id: int
    user_id: int
    post: str
    description: str | None
    create_date: datetime

    class Config:
        from_attributes = True
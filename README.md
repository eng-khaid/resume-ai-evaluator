# FastAPI Database Management System

## 📌 نظرة عامة (Overview)

هذا المشروع هو تطبيق **FastAPI** متقدم يوضح كيفية بناء **REST API** احترافية باستخدام:
- **SQLAlchemy ORM** - لإدارة قاعدة البيانات
- **Pydantic** - للتحقق من صحة البيانات
- **SQLite** - كقاعدة بيانات محلية

This project demonstrates a professional **REST API** implementation with complete CRUD operations for managing users in a database.

---

## 🎯 الميزات الرئيسية (Key Features)

✅ **User Management System** - إنشاء وقراءة بيانات المستخدمين  
✅ **Database Validation** - منع البيانات المكررة (Duplicate Email Prevention)  
✅ **Error Handling** - معالجة شاملة للأخطاء  
✅ **Pagination** - دعم استعلام البيانات بتقسيم الصفحات  
✅ **Type Safety** - استخدام Type Hints لضمان سلامة الأنواع  
✅ **API Documentation** - توثيق تلقائي عبر Swagger UI  

---

## 🏗️ البنية المعمارية (Architecture)

```
┌─────────────────────────────────────────┐
│         FastAPI Application             │
│  (Routes & Endpoint Handlers)           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│     SQLAlchemy ORM Layer                │
│  (Session Management & Queries)         │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│     SQLite Database Engine              │
│  (lesson9.db)                           │
└─────────────────────────────────────────┘
```

---

## 📦 المتطلبات (Requirements)

```
FastAPI==0.104.0
SQLAlchemy==2.0.0
Uvicorn==0.24.0
Pydantic==2.0.0
```

---

## ⚙️ خطوات الإعداد (Setup Instructions)

### 1️⃣ تثبيت المتطلبات
```bash
pip install fastapi sqlalchemy uvicorn pydantic
```

### 2️⃣ تشغيل التطبيق
```bash
python -m uvicorn database:app --reload
```

### 3️⃣ الوصول إلى التطبيق
- **API**: http://localhost:8000
- **Swagger Documentation**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

---

## 🗄️ هيكل قاعدة البيانات (Database Schema)

### جدول Users

| العمود (Column) | النوع (Type) | الوصف (Description) |
|---|---|---|
| `id` | Integer | معرف فريد للمستخدم (Primary Key) |
| `name` | String | اسم المستخدم (مطلوب) |
| `email` | String | البريد الإلكتروني (فريد، مطلوب) |
| `role` | String | دور المستخدم (افتراضي: "user") |

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    role VARCHAR DEFAULT 'user'
);
```

---

## 📡 نقاط النهاية (API Endpoints)

### ✨ 1. إنشاء مستخدم جديد
**POST** `/users`

**الطلب (Request):**
```json
{
    "name": "محمد أحمد",
    "email": "mohammed@example.com"
}
```

**الرد (Response):**
```json
{
    "id": 1,
    "name": "محمد أحمد",
    "email": "mohammed@example.com",
    "role": "user"
}
```

**رموز الحالة (Status Codes):**
- `201 Created` - تم إنشاء المستخدم بنجاح
- `400 Bad Request` - البريد الإلكتروني موجود بالفعل

---

### 📋 2. الحصول على جميع المستخدمين
**GET** `/users?skip=0&limit=10`

**المعاملات (Parameters):**
- `skip`: عدد الصفوف المراد تخطيها (للترقيم)
- `limit`: عدد النتائج المراد إرجاعها

**الرد (Response):**
```json
[
    {
        "id": 1,
        "name": "محمد أحمد",
        "email": "mohammed@example.com",
        "role": "user"
    },
    {
        "id": 2,
        "name": "فاطمة علي",
        "email": "fatima@example.com",
        "role": "user"
    }
]
```

---

### 🔍 3. البحث عن مستخدم بواسطة المعرف
**GET** `/users/{user_id}`

**الطلب (Request):**
```
GET /users/1
```

**الرد (Response):**
```json
{
    "id": 1,
    "name": "محمد أحمد",
    "email": "mohammed@example.com",
    "role": "user"
}
```

**رموز الحالة (Status Codes):**
- `200 OK` - تم العثور على المستخدم
- `404 Not Found` - المستخدم غير موجود

---

## 🔑 المفاهيم الأساسية (Core Concepts)

### 1. **SQLAlchemy ORM** - مُعامل الكائنات (Object-Relational Mapping)
```python
# بدلاً من كتابة SQL مباشرة:
# SELECT * FROM users WHERE email = 'test@example.com'

# نستخدم الكائنات:
user = db.query(User).filter(User.email == "test@example.com").first()
```

**الفائدة:** حماية من SQL Injection وكود أنظف وأكثر أماناً.

---

### 2. **Pydantic Schemas** - التحقق من البيانات
```python
class UserCreate(BaseModel):
    name: str  # يجب أن يكون نصاً
    email: str  # يجب أن يكون نصاً

# Pydantic سيتحقق تلقائياً من أن البيانات الواردة صحيحة
```

**الفائدة:** ضمان صحة البيانات قبل حفظها في قاعدة البيانات.

---

### 3. **Dependency Injection** - حقن الاعتماديات
```python
def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users")
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    # FastAPI تضمن تنظيف الاتصال بعد انتهاء الطلب
```

**الفائدة:** إدارة آمنة للموارد (Resources).

---

### 4. **الترقيم (Pagination)** - التعامل مع البيانات الضخمة
```python
users = db.query(User).offset(skip).limit(limit).all()

# مثال:
# skip=0, limit=10 → المستخدمون 1-10
# skip=10, limit=10 → المستخدمون 11-20
```

**الفائدة:** تحسين الأداء والاستجابة السريعة.

---

## 🛡️ معالجة الأخطاء (Error Handling)

```python
# التحقق من عدم وجود بريد مكرر
if existing:
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="A user with that email already exists"
    )

# التحقق من وجود المستخدم
if not user:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"User with id {user_id} not found"
    )
```

---

## 📊 مثال عملي كامل (Complete Example)

### الخطوة 1: تشغيل التطبيق
```bash
python -m uvicorn database:app --reload
```

### الخطوة 2: إنشاء مستخدم
```bash
curl -X POST "http://localhost:8000/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "محمد",
    "email": "mohammed@example.com"
  }'
```

### الخطوة 3: الحصول على جميع المستخدمين
```bash
curl "http://localhost:8000/users?skip=0&limit=10"
```

### الخطوة 4: البحث عن مستخدم محدد
```bash
curl "http://localhost:8000/users/1"
```

---

## 🧠 ما تعلمته (Learning Outcomes)

- ✅ كيفية بناء REST API احترافية باستخدام FastAPI
- ✅ إدارة قواعد البيانات بـ SQLAlchemy ORM
- ✅ التحقق من صحة البيانات بـ Pydantic
- ✅ معالجة الأخطاء بشكل احترافي
- ✅ تنفيذ الترقيم (Pagination)
- ✅ كتابة كود آمن خالي من SQL Injection

---

## 📝 الملاحظات المهمة (Important Notes)

⚠️ **SQLite محلية فقط** - هذا التطبيق يستخدم SQLite وهي مناسبة للتطوير. للإنتاج، استخدم PostgreSQL أو MySQL.

⚠️ **لا يوجد مصادقة** - هذا المشروع لا يتضمن نظام تسجيل دخول. أضفه للمشاريع الفعلية.

⚠️ **حماية CORS** - للإنتاج، قم بتفعيل CORS Middleware بشكل صحيح.

---

## 🚀 التطورات المستقبلية (Future Improvements)

- [ ] إضافة عمليات التحديث (Update) والحذف (Delete)
- [ ] تنفيذ نظام المصادقة (Authentication)
- [ ] تفعيل CORS Middleware
- [ ] كتابة اختبارات الوحدة (Unit Tests)
- [ ] استخدام قاعدة بيانات حقيقية (PostgreSQL)
- [ ] إضافة تسجيل (Logging) شامل

---

## 📚 مراجع مهمة (References)

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Tutorial](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

---

## 👨‍💻 الكاتب (Author)

تم إنشاء هذا المشروع كجزء من **SDE Bootcamp**  
**التاريخ:** يونيو 2026

---

**✨ شكراً لاستخدام هذا المشروع! نتمنى لك حظاً موفقاً في رحلة التطوير.**

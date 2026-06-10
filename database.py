from sqlmodel import SQLModel, create_engine, Session

# سيتم إنشاء قاعدة البيانات مباشرة داخل مجلد stage4
DATABASE_URL = "sqlite:///./resume_evaluator.db"

engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})

def create_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
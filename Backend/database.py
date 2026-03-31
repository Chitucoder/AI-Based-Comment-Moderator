from sqlalchemy import create_engine, Integer, String, Column, DateTime, Boolean, Float
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.sql import func

SQL_ALCHEMY_DATABASE_URL = "sqlite:///./moderation.db"
engine = create_engine(SQL_ALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key = True, index = True)
    
    username = Column(String, index = True)
    content = Column(String)
    
    toxic = Column(Float)
    severe_toxic = Column(Float)
    obscene = Column(Float)
    threat = Column(Float)
    insult = Column(Float)
    identity_hate = Column(Float)
    
    is_flagged = Column(Boolean,default = False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
def init_db():
    Base.metadata.create_all(bind=engine)
    
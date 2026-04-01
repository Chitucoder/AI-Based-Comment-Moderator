from contextlib import asynccontextmanager
from math import e
from sqlite3 import Date
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException,Request,Depends
import nltk
from nltk.corpus import stopwords
from fastapi.middleware.cors import CORSMiddleware
import joblib
import preprocessor as pr
from database import get_db, Comment, init_db
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi.templating import Jinja2Templates
from jinja2 import Environment, FileSystemLoader
import uvicorn

env = Environment(loader=FileSystemLoader("templates"))

@asynccontextmanager
async def lifespan(app: FastAPI):
    nltk.download('stopwords', quiet=True)
    app.state.stop_words = set(stopwords.words('english'))
    app.state.tfidf_vectorizer = joblib.load('models/tfidf_vectorizer.pkl')
    app.state.model = joblib.load('models/toxicity_model.pkl')
    app.state.thresholds = joblib.load('models/thresholds.pkl')
    init_db()
    yield
    
    
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://moderation-system-deploy-ex7i2yvbe-chitucoders-projects.vercel.app",
        "https://moderation-system-deploy.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}


class TextInput(BaseModel):
    text: str

labels = ['toxic','severe_toxic','obscene','threat','insult','identity_hate']
@app.post("/predict")
async def read_root(text: TextInput,req: Request):
    cleaned_text = pr.cleaning_string(text.text, req.app.state.stop_words)
    X_input = req.app.state.tfidf_vectorizer.transform([cleaned_text])
    prediction = req.app.state.model.predict_proba(X_input)[0]
    toxic_prob = {
        label: float(prediction[i].round(2))
        for i, label in enumerate(labels)
    }
    data = {"text_original": text.text}
    data["probabilities"] = toxic_prob
    data['moderation'] = pr.evaluate_toxicity(toxic_prob, req.app.state.thresholds)
    return data
    
@app.post("/submit")
async def submit_comment(username: str,content: str, req: Request, db: Session = Depends(get_db)):
    try:
        cleaned_text = pr.cleaning_string(content, req.app.state.stop_words)
        
        X_input = req.app.state.tfidf_vectorizer.transform([cleaned_text])
        
        probas = req.app.state.model.predict_proba(X_input)[0]
        
        prob_map = {label: float(probas[i].round(2)) for i, label in enumerate(labels)}
        
        decision = pr.evaluate_toxicity(prob_map, req.app.state.thresholds)
        
        new_comment = Comment(
            username = username,
            content = content,
            toxic = prob_map['toxic'],
            severe_toxic = prob_map['severe_toxic'],
            obscene = prob_map['obscene'],
            threat = prob_map['threat'],
            insult = prob_map['insult'],
            identity_hate = prob_map['identity_hate'],
            is_flagged = decision['is_flagged']
        )
        db.add(new_comment)
        db.commit()
        return {"status" : "success", "message" : "Comment Posted"}
    except Exception as e:
        db.rollback()
        return {"status" : "error", "message" : str(e)}
    finally:
        db.close()

class CommentResponse(BaseModel):
    id: int
    username: str
    content: str
    toxic: float
    severe_toxic: float
    obscene: float
    threat: float
    insult: float
    identity_hate: float
    is_flagged: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
        

@app.get("/comments",response_model = list[CommentResponse])
async def get_comments(db: Session = Depends(get_db)):
    comments = db.query(Comment).order_by(Comment.created_at.desc()).all()
    return comments

@app.delete("/admin/delete/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    try:
        comment = db.query(Comment).filter(Comment.id == comment_id).first()
        if comment:
            db.delete(comment)
            db.commit()
            return {"status": "success", "id": comment_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
        

@app.put("/admin/toggle-flag/{comment_id}")
async def toggle_flag(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    try:
        comment.is_flagged = not comment.is_flagged
        db.commit()
        return {
            "status": "success", 
            "id": comment_id, 
            "new_state": comment.is_flagged
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database update failed")
    

@app.get("/admin-dashboard")
async def admin_dashboard(request: Request,db: Session = Depends(get_db)):
    comments = db.query(Comment).order_by(Comment.created_at.desc()).all()
    total = len(comments)
    flagged = sum(1 for comment in comments if comment.is_flagged)
    template = env.get_template("admin.html")
    html = template.render(
        request=request,
        comments=comments,
        stats={"total": total, "flagged": flagged}
    )
    return HTMLResponse(content = html)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0",port = 8000)
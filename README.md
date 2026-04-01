# 🛡️ AI-Based Comment Moderation System

An end-to-end AI-powered system that analyzes user comments and determines whether they are safe to be displayed. The model performs **multi-label toxicity classification** and returns probability scores instead of simple binary outputs.

---

## 🚀 Features

* Multi-label toxicity classification (toxic, obscene, threat, insult, identity hate)
* Probability-based scoring instead of yes/no output
* Real-time moderation (blur / warning for unsafe comments)
* Admin dashboard to review flagged content
* Clean and simple UI for interaction

---

## 🧠 Model Details

* Algorithm: Logistic Regression
* Vectorization: TF-IDF
* Dataset: Jigsaw Toxic Comment Dataset
* Approach: Multi-label classification

---

## 🛠️ Tech Stack

**Backend:** FastAPI (Python)
**Frontend:** HTML, CSS, JavaScript
**Machine Learning:** Scikit-learn
**Database:** Neon (PostgreSQL)

---

## 🌐 Deployment

* Backend: Render
* Frontend: Vercel
* Database: Neon

---

## 📸 Screenshots

*Add your screenshots here*

---

## 🔗 Live Demo

[https://yourapp.vercel.app](https://yourapp.vercel.app)

---

## ⚙️ How It Works

1. User submits a comment
2. Text is preprocessed and vectorized using TF-IDF
3. Logistic Regression model predicts probabilities for each toxicity label
4. System evaluates risk score
5. UI responds accordingly (normal display / warning / blur)
6. Flagged comments are available in the admin dashboard

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Backend setup

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on:

```
http://127.0.0.1:8000
```

---

### 3. Frontend setup

Open the frontend folder and run using Live Server or any static server.

---

### ⚠️ Important (Local Development)

When running the project locally, make sure your frontend API calls point to the **local backend endpoint** instead of the deployed URL.

Example:

```js
// Local
http://127.0.0.1:8000/predict

// Production
https://your-backend.onrender.com/predict
```

Update your API URLs accordingly depending on your environment.

---

## 📌 Future Improvements

* Improve model accuracy using deep learning (LSTM / Transformers)
* Add user authentication
* Support multilingual comments
* Improve UI/UX

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## ⭐ Acknowledgements

* Jigsaw Toxic Comment Dataset

---

## 📬 Contact

For feedback or suggestions, feel free to reach out:
chaitanyakulkarni1345@gmail.com

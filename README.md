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

<img width="556" height="287" alt="Create Post" src="https://github.com/user-attachments/assets/368e1698-2c42-41e9-9e40-e61ba3dd4648" />
<img width="479" height="400" alt="Analysis" src="https://github.com/user-attachments/assets/88833b00-8117-4d60-9bd9-ddbbd593c9bc" />
<img width="374" height="392" alt="Feed" src="https://github.com/user-attachments/assets/08e1732c-a044-4648-a62e-50d389edb4e2" />
<img width="424" height="389" alt="Confirmation" src="https://github.com/user-attachments/assets/6fd78190-ba8e-4c17-ae7c-c083cb216822" />
<img width="533" height="310" alt="History" src="https://github.com/user-attachments/assets/7a9c8298-830a-495a-a2e5-1c2ed43631d7" />
<img width="680" height="317" alt="Dashboard" src="https://github.com/user-attachments/assets/bd52f988-4eda-4225-a08f-54b9767f073f" />


---

## 🔗 Live Demo

[https://yourapp.vercel.app](https://moderation-system-deploy.vercel.app/)

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

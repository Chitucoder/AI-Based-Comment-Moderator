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

1. Create Post <br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/368e1698-2c42-41e9-9e40-e61ba3dd4648" width="600"/>
</p>

2. Analysis <br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/88833b00-8117-4d60-9bd9-ddbbd593c9bc" width="600"/>
</p>

3. Confirmation <br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/6fd78190-ba8e-4c17-ae7c-c083cb216822" width="600"/>
</p>

4. Feed <br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/08e1732c-a044-4648-a62e-50d389edb4e2" width="600"/>
</p>

5. User History <br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/7a9c8298-830a-495a-a2e5-1c2ed43631d7" width="600"/>
</p>

6. Admin Dashboard <br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/bd52f988-4eda-4225-a08f-54b9767f073f" width="600"/>
</p>


---

## 🔗 Live Demo

[https://moderation-system-deploy.vercel.app/](https://moderation-system-deploy.vercel.app/)

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
https://comment-moderation-api-yx0y.onrender.com/predict
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

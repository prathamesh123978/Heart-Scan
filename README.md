# ❤️ Heart-Scan - Heart Disease Prediction System

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3.0-orange.svg)](https://scikit-learn.org/)

> ML web app that predicts heart disease risk with 85-90% accuracy using 13 clinical parameters.

## 🎯 Features

- ✅ Real-time predictions with confidence scores
- ✅ 13 clinical parameters (age, BP, cholesterol, etc.)
- ✅ Random Forest classifier (87% accuracy)
- ✅ Responsive UI + REST API

## 🏗️ Tech Stack

| Backend | Frontend |
|---------|----------|
| FastAPI | HTML5 |
| scikit-learn | CSS3 |
| Random Forest | JavaScript |
| Python 3.11 | - |

## 📁 Project Structure
Heart-Scan/
├── backend/
│ ├── app.py
│ ├── model.pkl
│ └── requirements.txt
├── frontend/
│ └── index.html
└── README.md

text

## 📊 Dataset

**Cleveland Heart Disease Dataset** (UCI)
- 303 patient records
- 13 features
- Binary classification (0 = Low Risk, 1 = High Risk)

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/prathamesh123978/Heart-Scan.git
cd Heart-Scan

# 2. Setup backend
cd backend
pip install -r requirements.txt

# 3. Train model
python -c "
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle
df = pd.read_csv('../ml-notebook/heart.csv')
X = df.drop('target', axis=1)
y = df['target']
model = RandomForestClassifier()
model.fit(X, y)
pickle.dump(model, open('model.pkl', 'wb'))
print('✅ Done')
"

# 4. Run
python app.py
🌐 API
POST /predict - Get prediction

json
{
  "age": 63, "sex": 1, "cp": 3, "trestbps": 145,
  "chol": 233, "thalach": 150, "oldpeak": 2.3
}
Response:

json
{
  "prediction": 1,
  "risk": "High Risk",
  "confidence": 0.87
}
🧪 Test
Patient	Age	BP	Risk
High Risk	63	145	High (87%)
Low Risk	45	120	Low (82%)
🚢 Deploy on Render
Backend:

Build: pip install -r requirements.txt

Start: python app.py

Env: PYTHON_VERSION=3.11.9

Frontend: Static Site → Publish directory: frontend

👨‍💻 Author
Prathamesh

GitHub: https://github.com/prathamesh123978/Heart-Scan
Project Link:https://heart-scan-frontend-5dcj.onrender.com
⭐ Star this repo if you like it!

text

---

## 💾 **Save and push:**

```bash
git add README.md
git commit -m "Add short README"
git push

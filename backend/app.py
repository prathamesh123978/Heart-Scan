from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create dummy model if real model doesn't exist
class DummyModel:
    def predict(self, x):
        return np.array([0])
    def predict_proba(self, x):
        return np.array([[0.7, 0.3]])

# Try to load real model, use dummy if fails
try:
    if os.path.exists('model.pkl'):
        model = pickle.load(open('model.pkl', 'rb'))
        print("✅ Real model loaded")
    else:
        model = DummyModel()
        print("⚠️ Dummy model loaded (train real model later)")
except:
    model = DummyModel()
    print("⚠️ Dummy model loaded")

class Patient(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@app.post("/predict")
def predict(p: Patient):
    features = np.array([[p.age, p.sex, p.cp, p.trestbps, p.chol, 
                          p.fbs, p.restecg, p.thalach, p.exang, 
                          p.oldpeak, p.slope, p.ca, p.thal]])
    pred = model.predict(features)[0]
    prob = model.predict_proba(features)[0]
    
    return {
        "prediction": int(pred),
        "risk": "High Risk" if pred == 1 else "Low Risk",
        "confidence": float(max(prob))
    }

@app.get("/")
def root():
    return {"status": "running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
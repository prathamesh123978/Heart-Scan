const API_URL = 'https://heart-scan-backend-6rjc.onrender.com';

document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const patientData = {
        age: parseInt(document.getElementById('age').value),
        sex: parseInt(document.getElementById('sex').value),
        cp: parseInt(document.getElementById('cp').value),
        trestbps: parseInt(document.getElementById('trestbps').value),
        chol: parseInt(document.getElementById('chol').value),
        fbs: parseInt(document.getElementById('fbs').value),
        restecg: parseInt(document.getElementById('restecg').value),
        thalach: parseInt(document.getElementById('thalach').value),
        exang: parseInt(document.getElementById('exang').value),
        oldpeak: parseFloat(document.getElementById('oldpeak').value),
        slope: parseInt(document.getElementById('slope').value),
        ca: parseInt(document.getElementById('ca').value),
        thal: parseInt(document.getElementById('thal').value)
    };
    
    if (!patientData.age || !patientData.trestbps || !patientData.chol || !patientData.thalach) {
        alert('⚠️ Please fill all required fields before predicting.');
        return;
    }
    
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.querySelector('button').disabled = true;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });
        
        const data = await response.json();
        
        const resultDiv = document.getElementById('result');
        const riskText = document.getElementById('riskText');
        const confidence = document.getElementById('confidence');
        
        if (data.prediction === 1) {
            riskText.innerHTML = '⚠️ HIGH RISK of Heart Disease';
            resultDiv.className = 'result high-risk';
        } else {
            riskText.innerHTML = '✅ LOW RISK of Heart Disease';
            resultDiv.className = 'result low-risk';
        }
        
        confidence.innerHTML = `Confidence: ${(data.confidence * 100).toFixed(2)}%`;
        resultDiv.style.display = 'block';
        
    } catch (error) {
        alert('❌ Cannot connect to backend server. Please ensure server is running on http://localhost:8000');
        console.error('Connection error:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
        document.querySelector('button').disabled = false;
    }
});

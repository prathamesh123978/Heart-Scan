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

    // ✅ Fix 2: Safe validation that doesn't reject 0 as falsy
    const requiredFields = ['age', 'trestbps', 'chol', 'thalach'];
    const hasInvalid = requiredFields.some(f => patientData[f] == null || isNaN(patientData[f]));
    if (hasInvalid) {
        alert('⚠️ Please fill all required fields before predicting.');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.querySelector('button').disabled = true;

    try {
        // ✅ Fix 1: Added /predict to the URL
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

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

        // ✅ Fix 3: Safe confidence display with fallback
        const confidenceValue = typeof data.confidence === 'number' && !isNaN(data.confidence)
            ? (data.confidence * 100).toFixed(2)
            : 'N/A';

        confidence.innerHTML = `Confidence: ${confidenceValue}%`;
        resultDiv.style.display = 'block';

    } catch (error) {
        console.error('Connection error:', error);
        alert(`❌ Error: ${error.message || 'Cannot connect to backend server.'}`);
    } finally {
        document.getElementById('loading').style.display = 'none';
        document.querySelector('button').disabled = false;
    }
});

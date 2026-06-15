import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import pickle
import joblib

# Load your dataset
df = pd.read_csv('heart.csv')

# Check data
print(f"Dataset shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print(f"Target distribution:\n{df['target'].value_counts()}")

# Split features and target
X = df.drop('target', axis=1)
y = df['target']

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\n✅ Model Accuracy: {accuracy:.2%}")
print(f"\nClassification Report:\n{classification_report(y_test, y_pred)}")

# Save model
pickle.dump(model, open('../backend/model.pkl', 'wb'))
print("\n✅ Model saved as 'backend/model.pkl'")

# Save feature names
feature_names = X.columns.tolist()
with open('../backend/feature_names.txt', 'w') as f:
    f.write(','.join(feature_names))

# Feature importance
importance = pd.DataFrame({
    'feature': feature_names,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\n📊 Top 5 Important Features:")
print(importance.head())
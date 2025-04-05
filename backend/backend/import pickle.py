import pickle
from sklearn.linear_model import LinearRegression

# Train a new model (example)
model = LinearRegression()
# model.fit(X_train, y_train)  # Train with your actual dataset

# Save with the updated version
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

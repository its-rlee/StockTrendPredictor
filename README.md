# Stock Price Prediction Project
This project implements a stock price prediction system using machine learning models (Linear Regression and Bidirectional LSTM) to forecast stock prices for TSLA, AAPL, and NVDA. It includes a Jupyter notebook for model training and evaluation, a Flask backend API for serving predictions, and a React frontend for visualizing the results.

# Features
Model Training: Trains Linear Regression and LSTM models on historical stock data (2010 to present) and saves them for reuse.
Prediction: Generates 90-day historical predictions and 30-day future predictions using an ensemble of LR and LSTM models.
Backend API: Flask server provides a REST endpoint (/predict) to fetch predictions for a specified ticker.
Frontend Visualization: React app with Chart.js displays historical actual/predicted prices and future predictions, with a dropdown to select the stock.

# Prerequisites
Python 3.8+: For backend and training scripts.
Node.js 16+: For the React frontend.
Git: To clone and manage the repository.

# Setup Instructions
1. Clone the Repository
```
git clone https://github.com/your-username/stock_prediction.git
cd stock_prediction
```
2. Backend Setup
Install Python Dependencies:
`pip install -r requirements.txt`

Ensures flask, numpy, pandas, yfinance, tensorflow, joblib, flask-cors, and sklearn are installed.

Verify Model Files:
Ensure the models/ directory contains pre-trained files for TSLA, AAPL, and NVDA (.pkl for LR, .h5 for LSTM, .pkl for scalers).
If missing, train them using model_training.ipynb (see below).

Run the Flask Server:

`python app.py`

Server runs on http://localhost:5000.

3. Frontend Setup
Navigate to Frontend Directory:

`cd stock_frontend`
Install Node.js Dependencies:

`npm install`

Start the React App:

`npm start`

Opens at http://localhost:3000.

4. Training Models (Optional)
If model files are missing or you want to retrain:

Open model_training.ipynb in Jupyter Notebook:

`jupyter notebook`
Update the ticker variable (e.g., "TSLA", "AAPL", "NVDA") and run all cells.
Models and scalers will be saved to models/.

# Usage

## Backend API
Endpoint: `GET /predict`
Query Parameter: ticker (e.g., TSLA, AAPL, NVDA; defaults to TSLA).
Example Request:

`http://localhost:5000/predict?ticker=AAPL`

Response:
json

{
  "historical_dates": ["2024-10-15", ..., "2025-02-25"],
  "historical_actual": [150.23, ..., 170.45],
  "historical_predicted": [148.90, ..., 168.78],
  "future_dates": ["2025-02-26", ..., "2025-04-08"],
  "future_predicted": [171.23, ..., 175.89]
}

## Frontend
Open `http://localhost:3000` in your browser.
Use the dropdown to select a stock (TSLA, AAPL, NVDA).
View the chart showing:
Blue line: Actual prices (last 90 days).
Green dashed line: Predicted prices (last 90 days).
Red dashed line: Future predictions (next 30 days).


# Requirements
Python: flask, numpy, pandas, yfinance, tensorflow, joblib, flask-cors, scikit-learn.
Node.js: axios, chart.js, react, react-dom, react-chartjs-2.

# Acknowledgments
Uses Yahoo Finance (yfinance) for stock data.

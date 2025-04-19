from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
import yfinance as yf
import joblib
from sklearn.metrics import mean_squared_error
from tensorflow.keras.models import load_model
from datetime import datetime, timedelta
from flask_cors import CORS
import os
import pickle
import requests
from dotenv import load_dotenv
import feedparser

app = Flask(__name__)

@app.route("/")
def Home():
    return "Welcome to the Stock Trend Predictor API!"

CORS(app)


# Load API keys from .env file
load_dotenv()

MARKETAUX_API_KEY = os.getenv("MARKETAUX_API_KEY")
NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")

# Parameters
lookback = 200
past_days = 90
default_ticker = "TSLA"  # Default stock
valid_tickers = ["TSLA", "AAPL", "NVDA", "AMZN", "GOOG", "META"]  # Supported stocks

# Load models and scalers at startup for all tickers
models = {}
scalers = {}
for ticker in valid_tickers:
    models[ticker] = {
        # "lr": joblib.load(f"models/{ticker}_lr_model.pkl"),
        # "lstm": load_model(f"models/{ticker}_lstm_model.h5")
    }
    # scalers[ticker] = joblib.load(f"models/{ticker}_scaler.pkl")

def get_latest_data(ticker):
    cache_file = f"{ticker}_cache.pkl"
    if os.path.exists(cache_file):
        with open(cache_file, 'rb') as f:
            cached = pickle.load(f)
        if (datetime.today() - cached['timestamp']).days < 1:
            return cached['prices'], cached['dates']
    end_date = datetime.today().strftime('%Y-%m-%d')
    start_date = (datetime.today() - timedelta(days=550)).strftime('%Y-%m-%d')
    stock = yf.download(ticker, start=start_date, end=end_date)
    closing_prices = stock['Close'].values.flatten()
    dates = stock.index.strftime('%Y-%m-%d').tolist()
    if len(closing_prices) < lookback + past_days:
        raise ValueError(f"Not enough data: {len(closing_prices)} days available, need at least {lookback + past_days}")
    with open(cache_file, 'wb') as f:
        pickle.dump({'prices': closing_prices, 'dates': dates, 'timestamp': datetime.today()}, f)
    return closing_prices, dates

def prepare_sequence(scaled_data, start_idx):
    end_idx = start_idx + lookback
    if end_idx > len(scaled_data):
        raise ValueError(f"Cannot slice {lookback} days from index {start_idx}, data length is {len(scaled_data)}")
    sliced_data = scaled_data[start_idx:end_idx]
    if len(sliced_data) != lookback:
        raise ValueError(f"Sliced data has {len(sliced_data)} elements, expected {lookback}")
    return sliced_data.reshape(1, lookback)

@app.route('/predict', methods=['GET'])
def predict():
    try:
        ticker = request.args.get('ticker', default_ticker).upper()
        days = request.args.get('days', '30')  # Default to 30 if not provided

        if ticker not in valid_tickers:
            return jsonify({"error": f"Invalid ticker. Supported tickers: {valid_tickers}"}), 400
        
        try:
            days = int(days)
            if days not in [15, 30, 45, 60, 90]:
                return jsonify({'error': 'Days must be 15, 30, 45, 60, or 90'}), 400
        except ValueError:
            return jsonify({'error': 'Days must be an integer'}), 400

        latest_data, all_dates = get_latest_data(ticker)
        scaled_data = scalers[ticker].transform(latest_data.reshape(-1, 1))

        # Historical predictions (last 90 days)
        historical_pred_lr, historical_pred_lstm = [], []
        start_idx = len(latest_data) - lookback - past_days
        end_idx = len(latest_data) - lookback
        if start_idx < 0:
            raise ValueError(f"Start index {start_idx} is negative, data length is {len(latest_data)}")
        
        for i in range(start_idx, end_idx):
            sequence = prepare_sequence(scaled_data, i)
            sequence_lstm = sequence.reshape(1, lookback, 1)
            lr_pred = models[ticker]["lr"].predict(sequence).item()
            lstm_pred = models[ticker]["lstm"].predict(sequence_lstm, verbose=0).item()
            historical_pred_lr.append(lr_pred)
            historical_pred_lstm.append(lstm_pred)

        # Calculate weights based on historical data
        historical_pred_lr = scalers[ticker].inverse_transform(np.array(historical_pred_lr).reshape(-1, 1)).flatten()
        historical_pred_lstm = scalers[ticker].inverse_transform(np.array(historical_pred_lstm).reshape(-1, 1)).flatten()
        lr_mse = mean_squared_error(latest_data[-past_days:], historical_pred_lr)
        lstm_mse = mean_squared_error(latest_data[-past_days:], historical_pred_lstm)
        total_mse = lr_mse + lstm_mse
        lr_weight = 1 - (lr_mse / total_mse)
        lstm_weight = 1 - (lstm_mse / total_mse)

        # Future predictions (next 30 days)
        last_sequence = prepare_sequence(scaled_data, len(latest_data) - lookback)
        last_sequence_lstm = last_sequence.reshape(1, lookback, 1)
        future_pred_lr, future_pred_lstm = [], []
        sequence, sequence_lstm = last_sequence.copy(), last_sequence_lstm.copy()

        for _ in range(days):
            lr_pred = models[ticker]["lr"].predict(sequence).item()
            lstm_pred = models[ticker]["lstm"].predict(sequence_lstm, verbose=0).item()
            weighted_pred = lr_weight * lr_pred + lstm_weight * lstm_pred
            future_pred_lr.append(lr_pred)
            future_pred_lstm.append(lstm_pred)
            sequence = np.roll(sequence, -1, axis=1)
            sequence[0, -1] = weighted_pred
            sequence_lstm = np.roll(sequence_lstm, -1, axis=1)
            sequence_lstm[0, -1, 0] = weighted_pred

        # Inverse transform predictions
        future_pred_lr = scalers[ticker].inverse_transform(np.array(future_pred_lr).reshape(-1, 1)).flatten()
        future_pred_lstm = scalers[ticker].inverse_transform(np.array(future_pred_lstm).reshape(-1, 1)).flatten()
        future_pred_ensemble = lr_weight * future_pred_lr + lstm_weight * future_pred_lstm

        # Prepare response
        actual_prices = latest_data[-past_days:].tolist()
        historical_dates = all_dates[-past_days:]
        future_dates = pd.date_range(start=datetime.today(), periods=days, freq='B').strftime('%Y-%m-%d').tolist()

        response = {
            "historical_dates": historical_dates,
            "historical_actual": actual_prices,
            "historical_predicted": (lr_weight * historical_pred_lr + lstm_weight * historical_pred_lstm).tolist(),
            "future_dates": future_dates,
            "future_predicted": future_pred_ensemble.tolist()
        }
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/news', methods=['GET'])
def get_news():
    feed_url = "https://finance.yahoo.com/news/rssindex" 
    feed = feedparser.parse(feed_url)
    articles = []
    for entry in feed.entries:
        articles.append({
            "title": entry.get("title", "No Title"),
            "description": entry.get("summary", "No Description"),
            "url": entry.get("link", "#"),
            "pubDate": entry.get("published", "No Date"),
            "image": entry.get("media_content", [{}])[0].get("url", "https://via.placeholder.com/150") 
        })

<<<<<<< Updated upstream
        yahoo_news_response = requests.get(
            "https://api.marketaux.com/v1/news/all",
            params={"api_token": MARKETAUX_API_KEY, "limit": 10, "sources": "yahoo.com"},
        )

        google_news_response = requests.get(
            "https://newsapi.org/v2/top-headlines",
            params={"apiKey": NEWSAPI_KEY, "sources": "google-news"},
        )

        yahoo_news = yahoo_news_response.json().get("data", [])
        google_news = google_news_response.json().get("articles", [])
        news = yahoo_news + google_news

        return jsonify(news)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/market_trend/<symbol>', methods=['GET'])
def get_stock_data(symbol):
    try:
        stock = yf.Ticker(symbol)
        stock_info = stock.history(period="5d")
        
        if len(stock_info) < 2:
            return jsonify({'error': 'Not enough data available'}), 500
        
        price_today = stock_info['Close'].iloc[-1]
        price_yesterday = stock_info['Close'].iloc[-2]
        change = ((price_today - price_yesterday) / price_yesterday) * 100
        
        stock_data = {
            'symbol': symbol,
            'price': price_today,
            'change': change,
            'marketCap': stock.info['marketCap']
        }
        
        return jsonify(stock_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

=======
    return jsonify(articles)
>>>>>>> Stashed changes

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

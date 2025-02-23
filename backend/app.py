from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
from datetime import datetime
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import os
import sys

# Add the directory containing model_training2.py to Python path
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'models')
sys.path.append(MODEL_DIR)

try:
    from model_training2 import train_and_evaluate
except ImportError as e:
    print(f"Error importing model_training2: {e}")
    print(f"Current Python path: {sys.path}")
    print(f"Looking for model in: {MODEL_DIR}")
    raise

app = Flask(__name__)
CORS(app)

# Configuration
class Config:
    MODEL_PATH = os.path.join(MODEL_DIR, 'model_training2.py')
    
    @staticmethod
    def validate_model_file():
        """Validate that the model file exists"""
        if not os.path.exists(Config.MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {Config.MODEL_PATH}")

def validate_stock_symbol(symbol):
    """Validate if the stock symbol exists"""
    try:
        stock = yf.Ticker(symbol)
        info = stock.info
        return True, None
    except Exception as e:
        return False, str(e)

@app.route('/api/health', methods=['GET'])
def health_check():
    """API health check endpoint that also verifies model file accessibility"""
    try:
        Config.validate_model_file()
        return jsonify({
            'status': 'healthy',
            'model_path': Config.MODEL_PATH,
            'model_accessible': True
        })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'model_path': Config.MODEL_PATH,
            'model_accessible': False
        }), 500

@app.route('/api/predict', methods=['POST'])
def predict_stock():
    """Stock prediction API - directly uses the model's training and prediction functionality"""
    try:
        # Validate model file accessibility
        Config.validate_model_file()
        
        data = request.json
        symbol = data.get('symbol', '').upper()
        future_days = int(data.get('future_days', 30))
        
        # Validate input parameters
        if not symbol:
            return jsonify({'error': 'Please enter a stock symbol'}), 400
        if not 1 <= future_days <= 365:
            return jsonify({'error': 'Prediction days must be between 1 and 365'}), 400
            
        # Validate stock symbol
        is_valid, error = validate_stock_symbol(symbol)
        if not is_valid:
            return jsonify({'error': f'Invalid stock symbol: {error}'}), 400

        # Use model for prediction
        _, _, _, history, metrics = train_and_evaluate(
            ticker=symbol,
            start_date="2015-01-01",  # Using model's default training date range
            end_date="2024-01-01",
            future_days=future_days
        )

        # Get latest stock data for display
        stock = yf.download(symbol, start="2015-01-01", end=datetime.now().strftime('%Y-%m-%d'))
        latest_price = stock['Close'].iloc[-1]
        
        # Extract prediction results from metrics
        prediction_metrics = {
            'latest_price': float(latest_price),
            'model_metrics': {
                'ensemble': metrics['Ensemble'],
                'lstm': metrics['LSTM'],
                'linear_regression': metrics['Linear Regression']
            }
        }

        # Convert matplotlib chart to base64 string
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.getvalue()).decode()
        plt.close()  # Ensure chart is closed
        
        response_data = {
            'success': True,
            'symbol': symbol,
            'prediction_metrics': prediction_metrics,
            'chart_data': image_base64,
            'training_history': {
                'loss': history.history['loss'],
                'val_loss': history.history['val_loss']
            }
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/stock-info', methods=['GET'])
def get_stock_info():
    """API to get basic stock information"""
    symbol = request.args.get('symbol', '').upper()
    
    if not symbol:
        return jsonify({'error': 'Please enter a stock symbol'}), 400
        
    try:
        stock = yf.Ticker(symbol)
        info = stock.info
        
        return jsonify({
            'success': True,
            'info': {
                'name': info.get('longName'),
                'sector': info.get('sector'),
                'industry': info.get('industry'),
                'currentPrice': info.get('currentPrice'),
                'marketCap': info.get('marketCap'),
                'currency': info.get('currency')
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    # Validate model file before starting the server
    try:
        Config.validate_model_file()
        print(f"Model file found at: {Config.MODEL_PATH}")
        app.run(debug=True, port=5000)
    except FileNotFoundError as e:
        print(f"Error: {e}")
        print("Please ensure the model file is in the correct location")
        sys.exit(1)
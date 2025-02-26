import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [data, setData] = useState({
    historical_dates: [],
    historical_actual: [],
    historical_predicted: [],
    future_dates: [],
    future_predicted: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/predict')
      .then(response => {
        console.log('API Response:', response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching predictions:', error);
        setLoading(false);
      });
  }, []);

  console.log('Current State Data:', data);

  const isDataValid = data.historical_dates.length > 0 && data.future_dates.length > 0;
  const chartData = isDataValid ? {
    labels: [...data.historical_dates, ...data.future_dates],
    datasets: [
      {
        label: 'Historical Actual Prices',
        data: [...data.historical_actual, ...Array(data.future_dates.length).fill(null)],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Historical Predicted Prices',
        data: [...data.historical_predicted, ...Array(data.future_dates.length).fill(null)],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: false,
        tension: 0.1,
        borderDash: [5, 5],
      },
      {
        label: 'Future Predicted Prices',
        data: [...Array(data.historical_dates.length).fill(null), ...data.future_predicted],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: false,
        tension: 0.1,
        borderDash: [5, 5],
      },
    ],
  } : { labels: [], datasets: [] };

  console.log('Chart Data:', chartData);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'TSLA Stock Price: 90 Days Past + 30 Days Future' },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Price ($)' } },
    },
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Stock Price Prediction</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !isDataValid ? (
        <p>No valid data available</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}

export default App;
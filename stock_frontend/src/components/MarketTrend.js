import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../src/MarketTrend.css';

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


const MarketTrend = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Define stock symbols to fetch data for
        const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA']; // Update with your desired stock symbols
        const stockDataPromises = symbols.map((symbol) =>
          axios.get(`http://localhost:5000/market_trend/${symbol}`)
        );

        const responses = await Promise.all(stockDataPromises);
        const data = responses.map((response) => response.data);
        setStocks(data); // Set the fetched data into state
      } catch (error) {
        setError('Error fetching stock data');
      }
    };

    fetchStockData();
  }, []);

  return (
    
      <div class="container">
        <div className="market-trend pt-5">
          <div className="container">
            <h1>Market Trend</h1>
            <p>Stay updated with the latest market trends and insights. Our market trend analysis provides you with the information you need to stay ahead in the stock market.</p>
            <p>We analyze various market indicators and trends to give you a comprehensive view of the market.</p>
            <p>Explore our market trend reports and stay informed about the latest developments in the stock market.</p>
          </div>
        </div>
        <h3>Trending Now</h3>
        {error && <p>{error}</p>} {/* Display error message if there's an issue */}
        <div className="row stock-card">
          {stocks.map((stock, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="border shadow p-2 rounded">
                <div className="stock-symbol">{stock.symbol}</div>
                <div className="stock-name">{stock.name}</div>
                <div className="stock-price">{stock.price}</div>
                <div className={`stock-change ${stock.change > 0 ? 'text-success' : 'text-danger'}`}>
                  {stock.change > 0 ? `+${stock.change}` : stock.change}
                </div>
                <div className="stock-marketCap">Market Cap: {stock.marketCap}</div>
              </div>
            </div>
          ))}
        </div>

        <table className="table table-striped table-bordered align-middle text-center shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Chart</th>
            <th>Price</th>
            <th>Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td className="fw-bold text-primary">{stock.symbol}</td>
              <td className="text-start">{stock.name}</td>
              <td style={{ width: "120px", height: "30px" }}>
                <Line
                  data={{
                    labels: stock.history?.map((_, i) => i), // Mock x-axis (time series)
                    datasets: [
                      {
                        data: stock.history || [stock.price], // Use historical data if available
                        borderColor: stock.change > 0 ? "green" : "red",
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { x: { display: false }, y: { display: false } },
                  }}
                  width={120}
                  height={25}
                />
              </td>
              <td className="text-end">${stock.price.toFixed(2)}</td>
              <td className={stock.change > 0 ? "text-success" : "text-danger"}>
                {stock.change > 0 ? `+${stock.change.toFixed(2)}` : stock.change.toFixed(2)}
              </td>
              <td className="text-end">{(stock.marketCap / 1e9).toFixed(2)}B</td> {/* Convert to billions */}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default MarketTrend;

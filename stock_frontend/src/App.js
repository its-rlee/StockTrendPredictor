// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// import Header from './components/Header';
// import Footer from './components/footer';
// import About from './components/About';
// import MarketTrend from './components/MarketTrend';
// import News from './components/News';
// import './App.css';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function App() {
//   const [data, setData] = useState({
//     historical_dates: ["2023-01-01", "2023-01-02"],
//     historical_actual: [150, 160],
//     historical_predicted: [155, 165],
//     future_dates: ["2023-04-01", "2023-04-02"],
//     future_predicted: [170, 180]
//   });
//   const [loading, setLoading] = useState(true);
//   const [ticker, setTicker] = useState('TSLA'); // Default ticker

//   const fetchData = (selectedTicker) => {
//     setLoading(true);
//     axios.get(`http://localhost:5000/predict?ticker=${selectedTicker}`)
//       .then(response => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching predictions:', error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchData(ticker); // Fetch data on initial load and ticker change
//   }, [ticker]);

//   const handleTickerChange = (event) => {
//     setTicker(event.target.value);
//   };

//   const isDataValid = data.historical_dates.length > 0 && data.future_dates.length > 0;
//   const chartData = isDataValid ? {
//     labels: [...data.historical_dates, ...data.future_dates],
//     datasets: [
//       {
//         label: 'Historical Actual Prices',
//         data: [...data.historical_actual, ...Array(data.future_dates.length).fill(null)],
//         borderColor: 'blue',
//         backgroundColor: 'rgba(0, 0, 255, 0.2)',
//         fill: false,
//         tension: 0.1,
//       },
//       {
//         label: 'Historical Predicted Prices',
//         data: [...data.historical_predicted, ...Array(data.future_dates.length).fill(null)],
//         borderColor: 'green',
//         backgroundColor: 'rgba(0, 255, 0, 0.2)',
//         fill: false,
//         tension: 0.1,
//         borderDash: [5, 5],
//       },
//       {
//         label: 'Future Predicted Prices',
//         data: [...Array(data.historical_dates.length).fill(null), ...data.future_predicted],
//         borderColor: 'red',
//         backgroundColor: 'rgba(255, 0, 0, 0.2)',
//         fill: false,
//         tension: 0.1,
//         borderDash: [5, 5],
//       },
//     ],
//   } : { labels: [], datasets: [] };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: `${ticker} Stock Price: 90 Days Past + 30 Days Future` },
//     },
//     scales: {
//       x: { title: { display: true, text: 'Date' } },
//       y: { title: { display: true, text: 'Price ($)' } },
//     },
//   };

//   return (
//     <Router>
//       <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
//         <Header />
//         <Routes>
//           <Route path="/about" element={<About />} />
//           <Route path="/market_trend" element={<MarketTrend />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/" element={
//             <>
//               <main className="main">
//                 <div className="content">
//                   <div className="welcome">
//                     <video autoPlay muted loop id="welcomeVideo">
//                       <source src={require('./components/welcome_video.mp4')} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                     <div className="overlay"></div>
//                     <div className="welcome-text">
//                       <h3>Where the World Trades the Future</h3>
//                       <p>Join 90 million traders and investors shaping the markets ahead.</p>
//                     </div>
//                   </div>
//                 </div>
//               </main>
//               <div className='filter-form' style={{ marginBottom: '20px', marginTop: '20px' }}>
//                 <label htmlFor="tickerSelect" >Select Stock: </label>
//                 <select id="tickerSelect" className='col-sm-12 col-md-6 col-lg-3 form-control' value={ticker} onChange={handleTickerChange} className="form-control">
//                   <option value="TSLA">TSLA</option>
//                   <option value="AAPL">AAPL</option>
//                   <option value="NVDA">NVDA</option>
//                 </select>
//               </div>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : !isDataValid ? (
//                 <p>No valid data available</p>
//               ) : (
//                 <Line data={chartData} options={options} />
//               )}
//             </>
//           } />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import Header from './components/Header';
import Footer from './components/footer';
import About from './components/About';
import MarketTrend from './components/MarketTrend';
import News from './components/News';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [data, setData] = useState({
    historical_dates: ["2023-01-01", "2023-01-02"],
    historical_actual: [150, 160],
    historical_predicted: [155, 165],
    future_dates: ["2023-04-01", "2023-04-02"],
    future_predicted: [170, 180]
  });
  const [loading, setLoading] = useState(true);
  const [ticker, setTicker] = useState('TSLA'); // Default ticker
  const [days, setDays] = useState(30); // Default prediction period (30 days)

  const fetchData = (selectedTicker, predictionDays) => {
    setLoading(true);
    axios.get(`http://localhost:5000/predict?ticker=${selectedTicker}&days=${predictionDays}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching predictions:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(ticker, days); // Fetch data on initial load and when ticker or days change
  }, [ticker, days]);

  const handleTickerChange = (selectedTicker) => {
    setTicker(selectedTicker);
  };

  const handleDaysChange = (selectedDays) => {
    setDays(selectedDays);
  };

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

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${ticker} Stock Price: 90 Days Past + ${days} Days Future` },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Price ($)' } },
    },
  };

  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '85%', margin: '0 auto' }}>
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/market_trend" element={<MarketTrend />} />
          <Route path="/news" element={<News />} />
          <Route path="/" element={
            <>
              <main className="">
                <div className="">
                  <div className="welcome">
                    <video autoPlay muted loop id="welcomeVideo">
                      <source src={require('./components/welcome_video.mp4')} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="overlay"></div>
                    <div className="welcome-text">
                      <h2>Where the World Trades the Future</h2>
                      <h6>Join 90 million traders and investors shaping the markets ahead.</h6>
                    </div>
                  </div>
                </div>
              </main>
                <div class="col-12 shadow-sm p-3 mb-5 bg-white rounded"style={{ marginBottom: '20px', marginTop: '20px' }}>
                  <div class="row">
                    <div class="col-12 col-md-4 ">
                      <div className="" >
                        <label>Select Stock: </label>
                        <div className="button-group">
                          <button type="button" className="btn btn-outline-info m-1"  onClick={() => handleTickerChange('TSLA')}>Tesla</button>
                          <button type="button" className="btn btn-outline-info m-1" onClick={() => handleTickerChange('AAPL')}>Apple</button>
                          <button type="button" className="btn btn-outline-info m-1" onClick={() => handleTickerChange('NVDA')}>Nvidia</button>
                          {/* Add more buttons for other companies as needed */}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div className="">
                        <label>Select Prediction Period (Days): </label>
                        <div className="button-group ">
                          <button type="button" className="btn btn-outline-info m-1"  onClick={() => handleDaysChange(15)}>15 Days</button>
                          <button className="btn btn-outline-info m-1" onClick={() => handleDaysChange(30)}>30 Days</button>
                          <button className="btn btn-outline-info m-1 " onClick={() => handleDaysChange(45)}>45 Days</button>
                          <button className="btn btn-outline-info m-1" onClick={() => handleDaysChange(60)}>60 Days</button>
                          <button className="btn btn-outline-info m-1" onClick={() => handleDaysChange(90)}>90 Days</button>
                          {/* Add more buttons for other day selections */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              

              

              {loading ? (
                <p>Loading...</p>
              ) : !isDataValid ? (
                <p>No valid data available</p>
              ) : (
                <Line data={chartData} options={options} />
              )}
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

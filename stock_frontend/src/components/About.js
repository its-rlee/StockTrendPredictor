import React from 'react';
import ting from '../assets/Ting.jpg';
import trung from '../assets/trung.jpg';
import hart from '../assets/Hart.jpg';
import '../assets/css/about.css'; // Import your CSS file for styling

const About = () => {
  return (
    <div className="about mt-5">
      <div className="container">
        <h1 className="text-center mb-4">About Us</h1>
        <p className="lead text-center">
          Welcome to Stock Trend Predictor. We are dedicated to providing accurate and reliable stock trend predictions to help traders and investors make informed decisions.
        </p>
        <p className="text-center">
          Our team of experts uses advanced algorithms and machine learning techniques to analyze market data and predict future stock trends.
        </p>
        <p className="text-center">
          Join us and be part of a community of 90 million traders and investors shaping the markets ahead.
        </p>
      </div>

      {/* How It Works Section */}
      <section className="mt-5">
        <h2 className="text-center mb-4">How Our Prediction Works</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4 how-it-works">
            <div className="card h-100 shadow-sm p-3">
              <div className="card-body">
                <h5 className="card-title">1. Data Collection</h5>
                <p className="card-text">
                  We gather historical stock data from trusted APIs such as
                  Yahoo Finance, including price, volume, and technical
                  indicators.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 how-it-works">
            <div className="card h-100 shadow-sm p-3">
              <div className="card-body">
                <h5 className="card-title">2. Machine Learning</h5>
                <p className="card-text">
                  Our trained AI models process the data using techniques like
                  LSTM (Long Short-Term Memory) to identify trends and
                  patterns.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 how-it-works">
            <div className="card h-100 shadow-sm p-3">
              <div className="card-body">
                <h5 className="card-title">3. Real-time Prediction</h5>
                <p className="card-text">
                  We provide real-time trend predictions for individual stocks
                  including direction and confidence level to guide users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section id="team" className="team-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Hard Working Team</h2>
          <div className="row g-4 justify-content-center">

            {/* Tingting Tang */}
            <div className="col-lg-4 col-md-6 d-flex team-card">
              <div className="card shadow-sm w-100 ">
                <img
                  src={ting}
                  className="card-img-top team-img"
                  alt="Tingting Tang"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Tingting Tang - 19936</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Back-end Developer</h6>
                  <p className="card-text">
                    Builds Flask backend for API requests.<br />
                    Develops endpoints for data retrieval & predictions.<br />
                    Integrates AI model for real-time inference.
                  </p>
                </div>
              </div>
            </div>

            {/* Trung Dung Ly */}
            <div className="col-lg-4 col-md-6 d-flex team-card">
              <div className="card shadow-sm w-100">
                <img
                  src={trung}
                  className="card-img-top team-img"
                  alt="Trung Dung Ly"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Trung Dung Ly – 20012</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Data Scientist</h6>
                  <p className="card-text">
                    Collects and preprocesses stock data (Yahoo Finance API).<br />
                    Develops and trains model for predictions.<br />
                    Optimizes model accuracy.
                  </p>
                </div>
              </div>
            </div>

            {/* Hartina Cleon */}
            <div className="col-lg-4 col-md-6 d-flex team-card">
              <div className="card shadow-sm w-100 ">
                <img
                  src={hart}
                  className="card-img-top team-img"
                  alt="Hartina Cleon"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Hartina Cleon - 20145</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Front-end Developer</h6>
                  <p className="card-text">
                    Designs UI for stock trend visualization.<br />
                    Implements search & prediction display.<br />
                    Adds stock filtering by categories.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

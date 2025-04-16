import React from 'react';
<<<<<<< Updated upstream

import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import hart from '../img/hart.png';
import ting from '../img/tingting.jpg';
import trung from '../img/trung.jpg';
=======
import ting from '../assets/Ting.jpg';
import trung from '../assets/trung.jpg';
import hart from '../assets/Hart.jpg';
import '../assets/css/about.css'; // Import your CSS file for styling
>>>>>>> Stashed changes

const About = () => {
  return (
    <div className="about mt-5">
      <div className="container">
<<<<<<< Updated upstream
        <h1 className='section-title'>About Us</h1>
        <p>Welcome to Stock Trend Predictor. We are dedicated to providing accurate and reliable stock trend predictions to help traders and investors make informed decisions.</p>
        <p>Our team of experts uses advanced algorithms and machine learning techniques to analyze market data and predict future stock trends.</p>
        <p>Join us and be part of a community of 90 million traders and investors shaping the markets ahead.</p>
      </div>
      <section className="hero bg-info text-white text-center py-5">
        <Container>
          <h1 className='section-title'>Stock Trend Predictor</h1>
          <p className="lead">AI-powered stock trend analysis to help investors make informed decisions.</p>
          <Button as={Link} to="/market-trends" variant="light" size="lg">
            Explore Market Trends
          </Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <Container>
          <h2 className="text-center section-title">Why Choose Us?</h2>
          <Row className="text-center mt-4">
            <Col md={4}>
              <h3> Real-Time Stock Trends</h3>
              <p>Get the latest updates on stock prices and market movements.</p>
            </Col>
            <Col md={4}>
              <h3> AI-Powered Predictions</h3>
              <p>Our ML models analyze historical data for accurate forecasts.</p>
            </Col>
            <Col md={4}>
              <h3> Intuitive Data Visualization</h3>
              <p>Interactive charts and graphs for easy trend tracking.</p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <!-- Team Section --> */}
        <section id="team" class="team section">
=======
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
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
            <div class="container">

                <div class="row gy-4">

                <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                    <div class="team-member">
                        <div class="member-img">
                            <img src={ting} class="img-fluid" alt="ting photo"/>
                        </div>
                        <div class="member-info">
                            <h4>Tingting Tang - 19936</h4>
                            <span>Back-end developer</span>
                            <p>Builds Flask backend for API requests
                                Develops endpoints for data retrieval & predictions
                                Integrates AI model for real-time inference
                                </p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                    <div class="team-member">
                        <div class="member-img">
                            <img src={trung} class="" alt="trung photo" />
                        </div>
                        <div class="member-info">
                            <h4>Trung Dung Ly – 20012 </h4>
                            <span>Data Scientist</span>
                            <p>
                            Collects and preprocesses stock data (Yahoo Finance API)
                            Develops and trains model for predictions.
                            Optimizes model accuracy.

                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 d-flex " data-aos="fade-up" data-aos-delay="300">
                    <div class="team-member">
                        <div class="member-img">
                            <img src={hart} class="img-fluid" alt="hart photo" />
                        </div>
                        <div class="member-info">
                            <h4>Hartina Cleon - 20145</h4>
                            <span>Front-end Developer</span>
                            <p>
                            Designs UI for stock trend visualization
                            Implements search & prediction display
                            Adds stock filtering by categories.

                            </p>
                        </div>
                    </div>
=======
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
>>>>>>> Stashed changes
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

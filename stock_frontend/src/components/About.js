import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import hart from '../img/hart.png';
import ting from '../img/tingting.jpg';
import trung from '../img/trung.jpg';

const About = () => {
  return (
    <div className="about col-12 mt-5">
      <div className="container">
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

            {/* <!-- Section Title --> */}
            <div class="container section-title" data-aos="fade-up">
                <p>Our hard working team</p>
            </div>

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
                </div>
            </div>

            </div>

        </section>
    </div>
  );
};

export default About;
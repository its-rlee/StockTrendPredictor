import React from 'react';
const About = () => {
  return (
    <div className="about col-12 mt-5">
      <div className="container">
        <h1>About Us</h1>
        <p>Welcome to Stock Trend Predictor. We are dedicated to providing accurate and reliable stock trend predictions to help traders and investors make informed decisions.</p>
        <p>Our team of experts uses advanced algorithms and machine learning techniques to analyze market data and predict future stock trends.</p>
        <p>Join us and be part of a community of 90 million traders and investors shaping the markets ahead.</p>
      </div>
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
                            {/* <img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""> */}
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
                        {/* <img src="assets/img/team/team-2.jpg" class="img-fluid" alt=""> */}
                    </div>
                        <div class="member-info">
                            <h4>Trung Dung Ly – 20012 </h4>
                            <span>Data Scientis</span>
                            <p>
                            Collects and preprocesses stock data (Yahoo Finance API)
                            Develops and trains model for predictions.
                            Optimizes model accuracy.

                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
                    <div class="team-member">
                        <div class="member-img">
                            {/* <img src="assets/img/team/team-3.jpg" class="img-fluid" alt=""> */}
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
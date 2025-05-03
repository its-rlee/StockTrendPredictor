
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news');
        setNews(response.data);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news pt-5">
      <div className="container">
        <h1>Latest Stock Market News</h1>
        <p>Stay updated with the latest stock market trends.</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="container-fluid">
          <div className="row">
            {news.map((article, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
                <div className="card h-100 shadow-sm w-100">
                  <img
                    src={article.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                    alt={article.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.85rem' }}>
                      {new Date(article.pubDate).toLocaleString()}
                    </p>
                    <div className="mt-auto">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary w-100"
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      )}
    </div>
  );
};

export default News;
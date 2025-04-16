
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
        <div className="news-articles">
          {news.length === 0 ? (
            <p>No news available.</p>
          ) : (
            news.map((article, index) => (
              <div key={index} className="news-article">
                <img
                  src={article.image || 'https://via.placeholder.com/150'}
                  alt={article.title}
                  className="img-fluid mb-3"
                  style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                />
                <h2>{article.title}</h2>
                <small className="text-muted">{new Date(article.pubDate).toLocaleString()}</small>
                <p>{article.description}</p>
                <div>
                  <a className='btn-primary' href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>

                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default News;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const News = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const yahooNewsResponse = await axios.get('https://api.marketaux.com/v1/news/all', {
//           params: {
//             api_token: 'YOUR_MARKETAUX_API_KEY',
//             limit: 10,
//             sources: 'yahoo.com'
//           }
//         });

//         const googleNewsResponse = await axios.get('https://newsapi.org/v2/top-headlines', {
//           params: {
//             apiKey: 'YOUR_NEWSAPI_KEY',
//             sources: 'google-news'
//           }
//         });

//         setNews([...yahooNewsResponse.data.data, ...googleNewsResponse.data.articles]);
//       } catch (err) {
//         setError('Failed to fetch news.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="news">
//       <div className="container">
//         <h1>News</h1>
//         <p>Stay updated with the latest stock market news and trends.</p>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <div className="news-articles">
//           {news.map((article, index) => (
//             <div key={index} className="news-article">
//               <h2>{article.title}</h2>
//               <p>{article.description}</p>
//               <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default News;

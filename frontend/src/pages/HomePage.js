import React, { useEffect, useState } from 'react';
import CreateRecommendation from '../CreateRecommendation';

const HomePage = () => {
  const [recs, setRecs] = useState([]);

  const fetchRecs = () => {
    fetch('http://localhost:5001/api/recs')
      .then(res => res.json())
      .then(data => setRecs(data))
      .catch(err => console.error('Error fetching recs: ', err));
  };

  useEffect(() => {
    fetchRecs();
  }, []);

  return (
    <div>
      <h1>Recommendations</h1>

      <CreateRecommendation onNewRec={fetchRecs} />

      {recs.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        recs.map((rec) => (
          <div
            key={rec._id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            <h2>
              {rec.title}
              <span style={{ fontSize: '0.8rem', color: '#888' }}>
                ({rec.category})
              </span>
            </h2>
            <p>{rec.description}</p>
            <p>{rec.userId}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
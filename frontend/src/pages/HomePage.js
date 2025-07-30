import React, { useEffect, useState } from 'react';
import CreateRecommendation from '../CreateRecommendation';
import RecommendationItem from '../components/RecommendationItem';

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
          <RecommendationItem key={rec._id} rec={rec} onDelete={fetchRecs} />
        ))
      )}
    </div>
  );
};

export default HomePage;
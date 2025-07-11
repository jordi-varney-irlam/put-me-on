import React, { useEffect, useState } from 'react';
import CreateRecommendation from './CreateRecommendation'
import NavBar from './NavBar';

function App() {
  const [recs, setRecs] = useState([]);

  //fetch data and update the state
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
    <div style={{padding: '2rem' }}>

      {/*NAVBAR OVER ALL PAGES*/}
      <NavBar/>
      <h1>PutMeOn Recommendations</h1>


      {/* FORM TO CREATE A RECOMMENDATION */}
      <CreateRecommendation onNewRec={fetchRecs} />

      {/* DISPLAY EXISTING RECOMMENDATIONS */}
      {recs.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : ( recs.map((rec) => (
        <div key={rec._id} 
          style={{
            border: '1px solid #ccc', 
            padding: '1rem', 
            margin: '1rem 0' }}
        >
          <h2> {rec.title} 
          <span style={{ fontSize: '0.8rem', color: '#888' }}>
            ({rec.category})
            </span>
          </h2>
          <p>{rec.description}</p>
          </div>
        ))
      )}

      {/*LOW NAVBAR*/}
      <NavBar/>

    </div>
  );
}

export default App;

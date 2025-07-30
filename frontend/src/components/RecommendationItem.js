const RecommendationItem = ({ rec, onDelete }) => {
    const handleDelete = async () => {
      const confirm = window.confirm(`Delete "${rec.title}"?`);
      if (!confirm) return;
  
      try {
        const res = await fetch(`http://localhost:5001/api/recs/${rec._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        const data = await res.json();
  
        if (res.ok) {
          onDelete(); // let parent refresh
        } else {
          alert(data.message || 'Delete failed');
        }
      } catch (err) {
        console.error('Error deleting:', err);
        alert('Error deleting recommendation');
      }
    };
  
    return (
      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          margin: '1rem 0',
        }}
      >
        <h2>
          {rec.title}
          <span style={{ fontSize: '0.8rem', color: '#888' }}> ({rec.category})</span>
        </h2>
        <p>{rec.description}</p>
        <p>Posted by: {rec.userId?.username || 'Unknown'}</p>
  
        <button
          onClick={handleDelete}
          style={{
            marginTop: '0.5rem',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    );
  };
  
  export default RecommendationItem;
  
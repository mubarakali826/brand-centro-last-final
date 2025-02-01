function MainContent({ apartments }) {
    // Ensure the data exists and is an array
    const safeApartments = apartments || [];
  
    return (
      <div>
        {safeApartments.length === 0 ? (
          <p>No apartments available.</p>
        ) : (
          safeApartments.map((apartment, index) => (
            <div key={index} className="apartment-card">
              <h2>{apartment.name}</h2>
              <p>Floor: {apartment.floor}</p>
              <p>Status: {apartment.status}</p>
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default MainContent;
  
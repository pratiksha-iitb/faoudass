import { useState, useEffect } from 'react';

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    setCurrentDate(new Date()); // Set date only on the client
  }, []);

  if (currentDate === null) {
    return <p>Loading...</p>;
  }

  return <p>Current date: {currentDate.toLocaleDateString()}</p>;
};

export default CurrentDate;

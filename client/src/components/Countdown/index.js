import React from 'react';

const Countdown = ({ remainingTime }) => {
  return (
    <div style={{ display: 'flex' }}>
      <h1>Countdown: {remainingTime}</h1>
    </div>
  );
};

export default Countdown;

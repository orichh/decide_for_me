import React from 'react';

const Countdown = ({ state }) => {
  return (
    <div style={{ display: 'flex' }}>
      <h1>Countdown: 00:{state.timer}</h1>
    </div>
  );
};

export default Countdown;

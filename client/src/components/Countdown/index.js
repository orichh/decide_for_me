import React from 'react';

const Countdown = ({ state, remainingTime }) => {
  return (
    <div style={{ display: 'flex' }}>
      {state.voteEnded === true ? (
        <h1>Countdown: {state.timer}</h1>
      ) : (
        <h1>Countdown: {remainingTime}</h1>
      )}
    </div>
  );
};

export default Countdown;

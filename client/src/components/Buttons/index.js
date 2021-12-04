import React from 'react';
import Button from '@mui/material/Button';

const AddButton = ({ state, setState }) => {
  const buttonClick = (e) => {
    e.preventDefault();
    setState(state + 1);
  };
  return (
    <div style={{ display: 'flex' }}>
      <Button variant="outlined" onClick={buttonClick}>
        Button
      </Button>
    </div>
  );
};

export const StartVote = ({ state, setState }) => {
  const buttonClick = (e) => {
    e.preventDefault();
    console.log(state);
    state.userName === '' || state.decisionToMake === ''
      ? alert('add a name and decision to make')
      : setState({ ...state, voteStarted: true });
  };
  return (
    <div style={{ display: 'flex' }}>
      <Button variant="outlined" onClick={buttonClick}>
        Start Vote
      </Button>
    </div>
  );
};

export const SubmitVote = ({ state, setState }) => {
  const buttonClick = (e) => {
    e.preventDefault();
    // alert('you voted already');
    state.voteSubmitted === false
      ? setState({ ...state, voteSubmitted: true })
      : alert('you voted already');
  };
  return (
    <div style={{ display: 'flex' }}>
      <Button variant="outlined" onClick={buttonClick}>
        Submit Vote
      </Button>
    </div>
  );
};

export default AddButton;

import React from 'react';
import Button from '@mui/material/Button';
import { addDecisionStartVote, submitVoteApiRequest } from '@api';

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
    if (state.userName === '' || state.decisionToMake === '') {
      alert('add a name and decision to make');
    } else if (
      state.choices[0].choiceText === '' ||
      state.choices[1].choiceText === ''
    ) {
      alert('write in at least two choices');
    } else {
      // setState({ ...state, voteEnded: false });
      addDecisionStartVote(state).then((s) => {
        console.log('finished sending request 🛳🛳🛳🛳🛳🛳🛳', s);
        setState(s.data);
      });
    }
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
  const submitVoteClick = (e) => {
    e.preventDefault();
    if (state.voteSubmitted === undefined) {
      setState({ ...state, voteSubmitted: true });
      submitVoteApiRequest(state._id, state.voteSelection);
      alert(
        `Vote received! You voted for ${
          state.choices[state.voteSelection].choiceText
        }`
      );
    } else {
      alert('you voted already');
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <Button variant="outlined" onClick={submitVoteClick}>
        Submit Vote
      </Button>
    </div>
  );
};

export default AddButton;

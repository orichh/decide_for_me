import React, { useState, useEffect } from 'react';
import Title from '@components/Title';
import Footer from '@components/Footer';
import AddDecision from '@components/AddDecision';
import Choices from '@components/Choices';
import PastDecisions from '@components/PastDecisions';
import {
  getPreviousDecisions,
  getLatestDecision,
  updateLatestDecisionVoteEnded,
} from '@api';

// default state
const defaultState = {
  userName: '',
  decisionToMake: '',
  voteEnded: true,
  choices: [
    { choiceText: '', numVotes: 0 },
    { choiceText: '', numVotes: 0 },
    { choiceText: '', numVotes: 0 },
    { choiceText: '', numVotes: 0 },
    { choiceText: '', numVotes: 0 },
    { choiceText: '', numVotes: 0 },
    { choiceText: '', numVotes: 0 },
    { choiceText: '', numVotes: 0 },
    { choiceText: '', numVotes: 0 },
  ],
  voteStartTime: 0,
  voteEndTime: 0,
  timer: 15,
};

const App = () => {
  // calculate remaining time
  const calculateRemainingTime = () => {
    if (state.voteEnded === false) {
      const difference = Math.floor(
        (new Date(state.voteEndTime) - new Date()) / 1_000
      );
      return difference;
    } else {
      return 0;
    }
  };

  /* State Hooks */
  const [state, setState] = useState({
    userName: '',
    decisionToMake: '',
    voteEnded: true,
    choices: [
      { choiceText: '', numVotes: 0 },
      { choiceText: '', numVotes: 0 },
      { choiceText: '', numVotes: 0 },
      { choiceText: '', numVotes: 0 },
      { choiceText: '', numVotes: 0 },
      { choiceText: '', numVotes: 0 },
      { choiceText: '', numVotes: 0 },
      { choiceText: '', numVotes: 0 },
      { choiceText: '', numVotes: 0 },
    ],
    voteStartTime: 0,
    voteEndTime: 0,
    timer: 15,
  });
  const [previousDecisions, setPreviousDecisions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const [finalChoice, setFinalChoice] = useState({});

  // Listens for any changes to state and initializes if there's an ongoing vote
  useEffect(async () => {
    const { data } = await getLatestDecision();
    if (data[0].voteEnded === false) {
      setState(data[0]);
    }
  }, []);

  // logs the previous decisions
  useEffect(async () => {
    const { data } = await getPreviousDecisions();
    console.log(data[0]._id);
    if (
      previousDecisions.length === 0 ||
      previousDecisions[0]._id !== data[0]._id
    ) {
      setPreviousDecisions(data);
      console.log('previous decisions', previousDecisions);
    }
  }, []);

  // initializes remaining time if there's an ongoing vote
  useEffect(async () => {
    if (state.voteEnded === false) {
      setRemainingTime(calculateRemainingTime());
    }
    console.log('state changed tracking state', state);
  }, [state]);

  // countdown logic
  useEffect(async () => {
    if (state.voteEnded === false && remainingTime > 0) {
      setTimeout(() => {
        let time = calculateRemainingTime();
        if (time >= 0) {
          setRemainingTime(time);
        }
      }, 1000);
    } else if (remainingTime <= 0) {
      updateLatestDecisionVoteEnded(state._id);
      setState(defaultState);
    }
    // }, []);
  }, [remainingTime]);

  return (
    <>
      <Title />
      <AddDecision state={state} setState={setState} />
      <Choices
        state={state}
        setState={setState}
        remainingTime={remainingTime}
      />
      <PastDecisions
        previousDecisions={previousDecisions}
        setPreviousDecisions={setState}
      />
      {/* <Footer /> */}
    </>
  );
};

export default App;

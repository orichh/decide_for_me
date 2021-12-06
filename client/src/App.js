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
} from './api';

const App = () => {
  // calculate remaining time
  const calculateRemainingTime = () => {
    console.log('vote end time', state.voteEndTime);
    console.log('current time', new Date());
    if (state.voteEnded === false) {
      const difference = Math.floor(
        (new Date(state.voteEndTime) - new Date()) / 1_000
      );
      console.log('difference', difference);
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
    topChoice: {},
  });
  const [previousDecisions, setPreviousDecisions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  // Listens for any changes to state and initializes if there's an ongoing vote
  useEffect(async () => {
    const { data } = await getLatestDecision();
    if (data[0].voteEnded === false) {
      console.log('changing to latest state');
      setState((prevState) => {
        return { ...prevState, ...data[0] };
      });
    }
  }, []);

  // logs the previous decisions
  useEffect(async () => {
    console.log('state changed previous data');
    const { data } = await getPreviousDecisions();
    console.log('', data);
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
    console.log('remaining time', remainingTime);
    if (state.voteEnded === false && remainingTime > 0) {
      setTimeout(() => {
        let time = calculateRemainingTime();
        if (time >= 0) {
          setRemainingTime(time);
        }
      }, 1000);
    } else if (remainingTime < 0) {
      // setState({ ...state, voteEnded: true });
      // API PUT request here to modify the latest record
      updateLatestDecisionVoteEnded(state._id);
      setState({ ...state, voteEnded: true });
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
      <Footer />
    </>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Title from '@components/Title';
import Footer from '@components/Footer';
import AddDecision from '@components/AddDecision';
import Choices from '@components/Choices';
import PastDecisions from '@components/PastDecisions';
import { getPreviousDecisions, getLatestDecision } from './api';

const voteEndTime = new Date();
voteEndTime.setMinutes(voteEndTime.getMinutes() + 60);

const App = () => {
  const [state, setState] = useState({
    userName: '',
    decisionToMake: '',
    voteEnded: false,
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
    voteEndTime: new Date(new Date().setSeconds(new Date().getSeconds() + 16)),
    timer: 15,
    topChoice: {},
  });
  const [previousDecisions, setPreviousDecisions] = useState([]);
  const calculateRemainingTime = () => {
    const currentDateTime = new Date();
    console.log('end', state.voteEndTime);
    console.log('type', typeof new Date(state.voteEndTime));
    console.log('current', currentDateTime);
    console.log('type', typeof currentDateTime);
    const difference = Math.floor(
      (new Date(state.voteEndTime) - currentDateTime) / 1000
    );
    console.log('difference', difference);

    return difference;
  };
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(async () => {
    console.log('state changed with latest data');
    const { data } = await getLatestDecision();
    console.log('latest data', data[0]);
    if (data[0].voteEnded === false) {
      setState((prevState) => {
        return { ...prevState, ...data[0] };
      });
    }
  }, []);

  useEffect(async () => {
    console.log('state changed previous data');
    const { data } = await getPreviousDecisions();
    console.log('', data);
    // setPreviousDecisions(data);
  }, []);

  useEffect(async () => {
    if (state.voteEnded === false) {
      setRemainingTime(calculateRemainingTime());
    }
    console.log('state changed tracking state', state);
  }, [state]);

  useEffect(() => {
    console.log('remaining time', remainingTime);
    if (state.voteEnded === false) {
      // set remaining time

      remainingTime > 0
        ? setTimeout(() => {
            setRemainingTime(calculateRemainingTime());
          }, 1000)
        : setState({ ...state, voteEnded: true });
      // console.log('end time', state.voteEndTime);
      // console.log('current time', remainingTime);

      // check if no time remaining
      // end voting if no time remaining and send request to update latest decision
    } else if (remainingTime < 0) {
      setState({ ...state, voteEnded: true });
    }
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

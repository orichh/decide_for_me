import React, { useState, useEffect } from 'react';
import Title from '@components/Title';
import Footer from '@components/Footer';
import AddDecision from '@components/AddDecision';
import Choices from '@components/Choices';
import PastDecisions from '@components/PastDecisions';
import getPreviousDecisions from './api';

const App = () => {
  const [state, setState] = useState({
    userName: '',
    decisionToMake: '',
    voteStarted: false,
    voteSubmitted: false,
    choices: ['', '', '', '', '', '', '', '', ''],
    previousDecisions: [],
    voteStartTime: 0,
    voteEndTime: 0,
    timer: 15,
    topChoice: '',
  });

  useEffect(async () => {
    console.log('state changed', state);
    const { data } = await getPreviousDecisions();
    console.log('', data);
    setState({ ...state, previousDecisions: data });
  }, []);

  useEffect(async () => {
    console.log('state changed', state);
  }, [state]);

  return (
    <>
      <Title />
      <AddDecision state={state} setState={setState} />
      <Choices state={state} setState={setState} />
      <PastDecisions state={state} setState={setState} />
      <Footer />
    </>
  );
};

export default App;

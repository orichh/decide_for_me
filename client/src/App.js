import React, { useState, useEffect } from 'react';
import Title from '@components/Title';
import Footer from '@components/Footer';
import AddDecision from '@components/AddDecision';
import Choices from '@components/Choices';
import PastDecisions from '@components/PastDecisions';

const App = () => {
  const [state, setState] = useState({
    userName: '',
    decisionToMake: '',
    voteStarted: false,
    voteSubmitted: false,
    choices: ['', '', '', '', '', '', '', '', ''],
    voteStartTime: 0,
    voteEndTime: 0,
    timer: 15,
  });

  useEffect(() => {
    console.log('state changed', state);
  }, [state]);

  return (
    <>
      <Title />
      <AddDecision state={state} setState={setState} />
      <Choices state={state} setState={setState} />
      <PastDecisions />
      <Footer />
    </>
  );
};

export default App;

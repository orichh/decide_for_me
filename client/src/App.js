import React, { useState, useEffect } from 'react';
import Title from '@components/Title';
import Footer from '@components/Footer';
import AddDecision from '@components/AddDecision';
import Choices from '@components/Choices';
import PastDecisions from '@components/PastDecisions';

const App = () => {
  const [state, setState] = useState({
    voteStarted: false,
    timer: 15,
    userName: '',
    decisionToMake: '',
    voteSubmitted: false,
    numChoices: 10,
    choices: ['', '', '', '', '', '', '', '', ''],
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

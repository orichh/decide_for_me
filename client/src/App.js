import React, { useState, useEffect } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import AddDecision from '@components/AddDecision';
import Choices from '@components/Choices';
import Countdown from '@components/Countdown';
// import Buttons from '@components/Buttons';
import PastDecisions from '@components/PastDecisions';

const App = () => {
  const [state, setState] = useState({});

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <AddDecision />
      <Choices />
      <Countdown />
      <PastDecisions />
      <Footer />
    </>
  );
};

export default App;

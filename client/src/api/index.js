import axios from 'axios';

const localhost = axios.create({ baseURL: 'http://localhost:3002' });

const getPreviousDecisions = () => {
  return localhost.get('/decisions');
};

const getLatestDecision = () => {
  return localhost.get('/decision');
};

const addDecisionStartVote = (state) => {
  return localhost({
    method: 'POST',
    url: '/decision',
    params: state,
  });
};

export { getPreviousDecisions, getLatestDecision, addDecisionStartVote };

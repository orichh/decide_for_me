import axios from 'axios';

// aws
// const awsURL = axios.create({ baseURL: 'http://18.189.143.16' });

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
    data: state,
  });
};

const updateLatestDecisionVoteEnded = (_id) => {
  return localhost({
    method: 'PUT',
    url: '/decision',
    params: { _id },
  });
};

const submitVoteApiRequest = (_id, voteSelection) => {
  return localhost({
    method: 'PUT',
    url: '/vote',
    params: { _id, voteSelection },
  });
};

export {
  getPreviousDecisions,
  getLatestDecision,
  addDecisionStartVote,
  updateLatestDecisionVoteEnded,
  submitVoteApiRequest,
};

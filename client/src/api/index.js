import axios from 'axios';

const localhost = axios.create({ baseURL: 'http://localhost:3002' });

export default function getPreviousDecisions() {
  return localhost.get('/decisions');
}

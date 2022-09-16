import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sivsp6jfv9.execute-api.us-east-1.amazonaws.com/v1',
});

export { api };

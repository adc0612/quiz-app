import axios from 'axios';

const path = 'https://opentdb.com';
const _axios = axios.create({
  timeout: 60000,
  baseURL: path,
});

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default _axios;

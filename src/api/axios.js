import axios from 'axios';

const api = axios.create({
  baseURL: __DEV__ ? 'https://api.example.com' : 'https://api.com',
  timeout: 10000,
});

let _store;

export const injectStore = (store) => {
  _store = store;
};

api.interceptors.request.use(config => {
  if (_store) {
    const token = _store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

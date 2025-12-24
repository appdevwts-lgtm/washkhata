import axios from 'axios';

const api = axios.create({
  baseURL: __DEV__ ? 'https://api.example.com' : 'https://api.example.com',
  timeout: 10000,
});

// Get store dynamically to avoid circular dependency
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

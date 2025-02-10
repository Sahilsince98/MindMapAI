import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
};

export const profile = {
  create: (data: any) => api.post('/profile', data),
  get: () => api.get('/profile'),
  update: (data: any) => api.put('/profile', data),
};

export const chat = {
  send: (message: string) => api.post('/chat', { message }),
  getHistory: () => api.get('/chat'),
};

export const emotional = {
  log: (data: any) => api.post('/emotional', data),
  getLogs: () => api.get('/emotional'),
};

export const career = {
  assess: (data: any) => api.post('/career', data),
  getAssessment: () => api.get('/career'),
};
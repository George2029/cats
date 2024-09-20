import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  localStorage.setItem('x-auth-token', token);
};

const getAuthToken = () => {
  const token = localStorage.getItem('x-auth-token');
  console.log(`token: `, token);
  if (token) {
    apiClient.defaults.headers['x-auth-token'] = token;
  }
};

export const fetchCats = async (): Promise<Cat[]> => {
  getAuthToken();
  const response = await apiClient.get<LikeResponse>('/likes');
  console.log(`res.data:`, response.data);
  return response.data;
};

export const addLike = async (cat_id: string) => {
  getAuthToken();
  await apiClient.post('/likes', { cat_id });
};

export const removeLike = async (cat_id: string) => {
  getAuthToken();
  await apiClient.delete(`/likes/${cat_id}`);
};

export const createUser = async (login: string, password: string): Promise<void> => {
  const response = await apiClient.post('/user', { login, password });
  console.log(`response:`, response);
  const token = response.headers['x-auth-token'];
  console.log(`token:`, token);
  if (token) {
    setAuthToken(token);
  }
};

import { default as axios } from 'axios';

const http = axios.create({ baseURL: 'http://localhost:8000' });

http.interceptors.request.use(req => {
  const token = localStorage.getItem('access_token');
  if (token) {
    req.headers.set('Authorization', `Bearer ${token}`);
  }
  return req;
});

export { http };

export default http;

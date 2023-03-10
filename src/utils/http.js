import { default as axios } from 'axios';
import { useRouter } from 'vue-router';
import router from '../router';

const http = axios.create({
  baseURL:
    import.meta.env.VITE_API_ADDRESS ?? 'https://simple-bbs.api.lnkkerst.me'
});

http.interceptors.request.use(req => {
  const token = localStorage.getItem('access_token');
  if (token) {
    req.headers.set('Authorization', `Bearer ${token}`);
  }
  return req;
});

http.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      alert('登录失效，请重新登录');
      router.push('/login');
    }
    return Promise.reject(err);
  }
);
export { http };

export default http;

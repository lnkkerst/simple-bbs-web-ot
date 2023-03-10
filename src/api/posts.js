import { getPrevMonthLastDays } from 'element-plus/es/components/calendar/src/date-table';
import http from '../utils/http';

export const getPost = async ({ id }) => {
  return await http.get(`/posts/${id}`).then(res => res.data);
};

export const getPosts = async ({ page = 0, size = 20 } = {}) => {
  const skip = (page - 1) * size;
  const limit = size;
  const data = await http
    .get('/posts', { params: { skip, limit } })
    .then(res => res.data);
  data.forEach(post => {
    post.summary = post.content.slice(0, 200);
    delete post.content;
  });
  return data;
};

export const createPost = async ({ title, content }) => {
  return await http.post('/posts', { title, content }).then(res => res.data);
};

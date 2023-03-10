import http from '../utils/http';

export const getCommentsByPostId = async ({
  postId,
  page = 1,
  size = 20
} = {}) => {
  let skip = (page - 1) * size;
  let limit = size;
  return await http
    .get('/comments', { params: { post_id: postId, skip, limit } })
    .then(res => res.data);
};

export const createComment = async ({ content, postId }) => {
  return await http
    .post('/comments', { content, post_id: postId })
    .then(res => res.data);
};

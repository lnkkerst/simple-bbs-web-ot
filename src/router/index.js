import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '~/pages/Index.vue';
import Posts from '~/pages/Posts.vue';
import Login from '~/pages/Login.vue';
import Register from '~/pages/Register.vue';
import CreatePost from '~/pages/CreatePost.vue';
import { useUserState } from '~/composables/state';

// 手写路由
const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      requireLoggedIn: false
    }
  },
  {
    path: '/posts/create',
    component: CreatePost,
    meta: { requireLoggedIn: true }
  },
  {
    path: '/posts/:postId',
    component: Posts,
    meta: { requireLoggedIn: false }
  },
  {
    path: '/login',
    component: Login,
    meta: { requireLoggedIn: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { requireLoggedIn: false }
  },
  {
    path: '/:pathMatch(.*)*', // 404 路由
    component: {
      template: `页面不存在`
    },
    meta: { requireLoggedIn: false }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 路由守卫，需要登录的页面直接跳转到登陆页面
router.beforeEach((to, from) => {
  const user = useUserState();
  if (to.meta.requireLoggedIn && !user.value.isLoggedIn) {
    alert('请先登录');
    router.push('/login');
  }
});

export default router;

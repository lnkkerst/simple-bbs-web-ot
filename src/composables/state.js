import { useStorage } from '@vueuse/core';

// 简单的状态管理
export const useUserState = () =>
  useStorage('user', { isLoggedIn: false }, localStorage, {
    mergeDefaults: true
  });

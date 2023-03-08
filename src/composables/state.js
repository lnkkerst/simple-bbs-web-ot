import { useStorage } from '@vueuse/core';

export const useUserState = () =>
  useStorage('user', { isLoggedIn: false }, localStorage, {
    mergeDefaults: true
  });

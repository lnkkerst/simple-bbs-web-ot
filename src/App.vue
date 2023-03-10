<script setup>
import {
  ElButton,
  ElConfigProvider,
  ElContainer,
  ElHeader,
  ElMain,
  ElPageHeader
} from 'element-plus';
import { RouterLink, useRouter } from 'vue-router';
import { useUserState } from './composables/state';

const router = useRouter();
const user = useUserState();

const handleLogout = () => {
  user.value = { isLoggedIn: false };
  localStorage.setItem('access_token', null);
  alert('登出成功');
  router.push('/');
};
</script>

<template>
  <ElContainer>
    <ElHeader shadow>
      <div flex items-center h="full">
        <RouterLink text-5 to="/">Simple BBS</RouterLink>
        <div grow></div>
        <template v-if="user.isLoggedIn">
          <span mx-sm>
            <span text="gray xs">{{ '登录为 ' }}</span>
            <span>
              {{ user.username }}
            </span>
          </span>
          <ElButton link type="primary" @click="router.push('/posts/create')">
            发帖
          </ElButton>
          <ElButton link type="danger" @click="handleLogout">登出</ElButton>
        </template>
        <ElButton v-else link type="primary" @click="router.push('/login')">
          登录
        </ElButton>
      </div>
    </ElHeader>

    <ElMain>
      <div max-w="960px" w="96/100" mx="auto">
        <RouterView></RouterView>
      </div>
    </ElMain>
  </ElContainer>
</template>

<style scoped></style>

<style></style>

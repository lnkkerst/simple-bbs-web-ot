<script setup>
import { ElButton, ElCard, ElForm, ElFormItem, ElInput } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '~/api/users';
import { useUserState } from '../composables/state';

const router = useRouter();
const user = useUserState();

const formEl = ref();
const form = ref({
  username: '',
  password: ''
});
const rules = ref({
  username: [{ required: true, message: '用户名不可为空' }],
  password: [{ required: true, message: '密码不可为空' }]
});

const handleLogin = async () => {
  if (!formEl) {
    return;
  }

  if (!(await formEl.value.validate(() => {}))) {
    return;
  }

  try {
    const { username, userId, access_token, refresh_token } = await login(
      form.value
    );
    user.value = {
      isLoggedIn: true,
      username,
      userId,
      access_token,
      refresh_token
    };
    localStorage.setItem('access_token', access_token);
    alert('登录成功');
    router.push('/');
  } catch (e) {
    alert('用户名或密码错误');
  }
};
</script>

<template>
  <div>
    <ElCard header="登录" shadow="always" max-w="360px" mx-auto>
      <ElForm ref="formEl" :model="form" :rules="rules" label-width="72px">
        <ElFormItem label="用户名" prop="username">
          <ElInput v-model="form.username"></ElInput>
        </ElFormItem>

        <ElFormItem label="密码" prop="password">
          <ElInput type="password" v-model="form.password"></ElInput>
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handleLogin">登录</ElButton>
          <ElButton @click="router.push('/register')">注册</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

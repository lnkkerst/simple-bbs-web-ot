<script setup>
import { ElButton, ElCard, ElForm, ElFormItem, ElInput } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '~/api/users';

const router = useRouter();

const formEl = ref();
const form = ref({
  username: '',
  password: ''
});
const rules = ref({
  username: [{ required: true, message: '用户名不可为空' }],
  password: [{ required: true, message: '密码不可为空' }]
});

const handleRegister = async () => {
  if (!formEl) {
    return;
  }

  if (!(await formEl.value.validate(() => {}))) {
    return;
  }

  try {
    await register(form.value);
    alert('注册成功');
    router.push('/login');
  } catch (e) {
    alert('用户名已被注册');
  }
};
</script>

<template>
  <div>
    <ElCard header="注册" shadow="always" max-w="360px" mx-auto>
      <ElForm ref="formEl" :model="form" :rules="rules" label-width="72px">
        <ElFormItem label="用户名" prop="username">
          <ElInput v-model="form.username"></ElInput>
        </ElFormItem>

        <ElFormItem label="密码" prop="password">
          <ElInput v-model="form.password" type="password"></ElInput>
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handleRegister">注册</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

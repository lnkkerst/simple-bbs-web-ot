<script setup>
import { ElButton, ElInput } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '../api/posts';

const router = useRouter();

const title = ref('');
const content = ref('');

const handleSubmit = async () => {
  if (!title.value || !content.value) {
    alert('标题和正文内容不可为空');
    return;
  }
  try {
    const post = await createPost({
      title: title.value,
      content: content.value
    });
    router.push(`/posts/${post.id}`);
  } catch (e) {
    alert('未知错误，发布失败');
  }
};
</script>

<template>
  <div>
    <div text="xl" font="bold">发布新帖</div>

    <div mt="sm">
      <ElInput v-model="title" placeholder="标题" size="large"></ElInput>
    </div>

    <mavon-editor mt="sm" v-model="content"></mavon-editor>

    <div mt="sm" flex>
      <div grow></div>
      <ElButton type="primary" @click="handleSubmit">发布</ElButton>
    </div>
  </div>
</template>

<script setup>
import {
  ElButton,
  ElCard,
  ElDivider,
  ElInput,
  ElTimeline,
  ElTimelineItem
} from 'element-plus';
import { marked } from 'marked';
import { onMounted, ref } from 'vue';
import { createComment, getCommentsByPostId } from '../api/comments';

const props = defineProps(['postId']);
const comments = ref([]);

const newComment = ref('');

const handleSubmit = async () => {
  await createComment({ content: newComment.value, postId: props.postId });
  comments.value = await getCommentsByPostId({ postId: props.postId });
};

onMounted(async () => {
  comments.value = await getCommentsByPostId({ postId: props.postId });
});
</script>

<template>
  <div>
    <div text="xl" font="bold" my="sm">评论区</div>
    <ElTimeline>
      <ElTimelineItem v-for="comment in comments">
        <ElCard>
          <template #header>
            <span mx="1" text="lg">{{ comment.author.username }}</span>
            <span text="gray">说：</span>
          </template>
          <div prose max-w-full v-html="marked.parse(comment.content)"></div>
        </ElCard>
      </ElTimelineItem>
    </ElTimeline>

    <ElDivider></ElDivider>

    <div>
      <div text="xl" font="bold" my="sm">发布新评论</div>
      <ElInput type="textarea" my="sm" v-model="newComment"></ElInput>
      <div flex>
        <div grow></div>
        <ElButton type="primary" @click="handleSubmit">发布</ElButton>
      </div>
    </div>
  </div>
</template>

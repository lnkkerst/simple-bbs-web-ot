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
import { createComment, getCommentsByPostId } from '~/api/comments';
import { useUserState } from '~/composables/state';
import { useInfiniteScroll } from '@vueuse/core';

const user = useUserState();

const props = defineProps(['postId']);
const comments = ref([]);
const newComment = ref('');
let curPage = 1;
let perPage = 20;
let pageEnded = false;

const handleSubmit = async () => {
  await createComment({ content: newComment.value, postId: props.postId });
  comments.value = await getCommentsByPostId({ postId: props.postId });
};

const load = async () => {
  if (pageEnded) {
    return;
  }
  curPage++;
  const res = await getCommentsByPostId({
    postId: props.postId,
    page: curPage,
    size: perPage
  });
  if (res.length === 0) {
    pageEnded = true;
    return;
  }
  comments.value.push(...res);
};

useInfiniteScroll(document, load, { distance: 10 });

onMounted(async () => {
  comments.value = await getCommentsByPostId({ postId: props.postId });
});
</script>

<template>
  <div>
    <template v-if="user.isLoggedIn">
      <div>
        <div text="xl" font="bold" my="sm">发布新评论</div>
        <ElInput type="textarea" my="sm" v-model="newComment"></ElInput>
        <div flex>
          <div grow></div>
          <ElButton type="primary" @click="handleSubmit">发布</ElButton>
        </div>
      </div>
    </template>
    <div v-else>
      想要发评论，请先
      <RouterLink text-blue to="/login">登录</RouterLink>
    </div>

    <ElDivider></ElDivider>

    <div text="xl" font="bold" my="sm">评论区</div>
    <ElTimeline>
      <ElTimelineItem v-for="comment in comments">
        <ElCard>
          <template #header>
            <div flex>
              <div>
                <span mx="1" text="lg">{{ comment.author?.username }}</span>
                <span text="gray">说：</span>
              </div>
              <div grow></div>
              <div relative top="1.5" text="sm gray">
                {{ new Date(comment.publish_at * 1000).toLocaleString() }}
              </div>
            </div>
          </template>
          <div prose max-w-full v-html="marked.parse(comment.content)"></div>
        </ElCard>
      </ElTimelineItem>
    </ElTimeline>
  </div>
</template>

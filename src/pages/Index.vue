<script setup>
import {
  ElButton,
  ElCard,
  ElInfiniteScroll as vInfiniteScroll
} from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts } from '~/api/posts';
import * as marked from 'marked';
import { useInfiniteScroll } from '@vueuse/core';

const router = useRouter();

let posts = ref([]);
let curPage = 1;
let perPage = 20;
let pageEnded = false;

const load = async () => {
  if (pageEnded) {
    return;
  }
  curPage++;
  const res = await getPosts({ page: curPage, size: perPage });
  if (res.length === 0) {
    pageEnded = true;
    return;
  }
  posts.value.push(...res);
};

useInfiniteScroll(document, load, { distance: 10 });

onMounted(async () => {
  posts.value = await getPosts();
});
</script>
<template>
  <div>
    <ElCard mb="sm" v-for="post in posts" :key="post.id">
      <template #header>
        <div flex items-center>
          <span text="xl" font="bold">{{ post.title }}</span>
          <div grow></div>
          <span text="sm gray">
            {{
              `${post.author.username} 发布于 ${new Date(
                post.publish_at * 1000
              ).toLocaleString()}`
            }}
          </span>
        </div>
      </template>

      <div v-html="marked.parse(post.summary)"></div>

      <div mt="sm">
        <ElButton type="primary" link @click="router.push(`/posts/${post.id}`)">
          查看全文
        </ElButton>
      </div>
    </ElCard>

    <div text="gray center">一滴都没有了</div>
  </div>
</template>

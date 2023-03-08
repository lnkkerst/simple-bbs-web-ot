<script setup>
import { ElButton, ElCard } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts } from '~/api/posts';
import * as marked from 'marked';

const router = useRouter();

let posts = ref([]);

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
                post.publishAt
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
  </div>
</template>

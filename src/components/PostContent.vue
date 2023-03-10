<script setup>
import { useRoute } from 'vue-router';
import * as marked from 'marked';
import { getPost } from '~/api/posts';
import { onMounted, ref } from 'vue';

const props = defineProps(['postId']);

const route = useRoute();

const { postId } = props;

const post = ref({});

onMounted(async () => {
  post.value = await getPost({ id: postId });
});
</script>

<template>
  <div prose max-w-full>
    <h1>{{ post.title }}</h1>
    <div flex>
      <div grow></div>
      <span text="gray">
        {{
          `${post.author?.username} 于 ${new Date(
            post.publish_at * 1000
          ).toLocaleString()}`
        }}
      </span>
    </div>
    <div v-html="marked.parse(post.content ?? '')"></div>
  </div>
</template>

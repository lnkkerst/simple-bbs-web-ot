<script setup>
import { useRoute } from 'vue-router';
import { getPost } from '~/api/posts';
import { onMounted, ref } from 'vue';
import PostContent from '~/components/PostContent.vue';
import PostComment from '../components/PostComment.vue';
import { ElDialog, ElDivider } from 'element-plus';

const route = useRoute();

const { postId } = route.params;

const post = ref({});

onMounted(async () => {
  post.value = await getPost({ id: postId });
});
</script>

<template>
  <div>
    <PostContent :post-id="postId"></PostContent>
    <ElDivider></ElDivider>
    <PostComment mt="8" :post-id="postId"></PostComment>
  </div>
</template>

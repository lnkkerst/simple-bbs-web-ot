<script setup>
import { useRoute } from 'vue-router';
import PostContent from '~/components/PostContent.vue';
import PostComment from '~/components/PostComment.vue';
import { ElDivider } from 'element-plus';

const route = useRoute();

const { postId } = route.params;
</script>

<template>
  <div>
    <PostContent :post-id="postId"></PostContent>
    <ElDivider></ElDivider>
    <PostComment mt="8" :post-id="postId"></PostComment>
  </div>
</template>

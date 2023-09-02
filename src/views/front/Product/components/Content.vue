<script setup lang="ts">
import Title from '@/components/Title.vue';

defineProps<{
  content: string
}>();
</script>

<template>
  <Title page title="活動內容" />
  <div class="content" v-html="content" />
</template>

<style scoped>
.content :deep(p) {
  @apply text-base leading-normal;
}

.content :deep(.image) {
  @apply my-3;
}

.content :deep(img) {
  @apply h-auto max-w-full rounded-m object-cover;
}

.content :deep(figcaption) {
  @apply mt-2 text-sm leading-normal text-cc-other-3;
}
</style>

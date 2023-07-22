<script setup>
import Title from '@/components/Title.vue';

defineProps({
  content: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <Title page title="活動特色" />
  <div class="content" v-html="content" />
</template>

<style scoped>
.content {
  @apply w-8/12 pr-8;
}

.content :deep(p) {
  @apply text-base leading-normal;
}

.content :deep(.image) {
  @apply my-3;
}

.content :deep(img) {
  @apply h-auto max-w-full rounded-2xl object-cover;
}

.content :deep(figcaption) {
  @apply mt-2 text-sm leading-normal text-cc-other-3;
}
</style>

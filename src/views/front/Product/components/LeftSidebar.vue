<script setup lang="ts">
import Title from '@/components/Title.vue';

defineProps<{
  features: string
}>();
</script>

<template>
  <Title page title="活動特色" />
  <div class="list" v-html="features" />
</template>

<script setup>
import Title from '@/components/Title.vue';

defineProps({
  features: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <Title page title="活動特色" />
  <div id="list" v-html="features" />
</template>

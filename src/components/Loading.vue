<script setup>
import 'vue-loading-overlay/dist/css/index.css';

import { ref } from 'vue';
import Loading from 'vue-loading-overlay';

defineProps({
  width: Number,
  height: Number,
  loader: String,
  fullPage: Boolean
});

const isLoading = ref(false);

function show() {
  isLoading.value = true;
}

function hide() {
  isLoading.value = false;
}

defineExpose({
  show,
  hide
});
</script>

<template>
  <Loading
    color="#0F4BB4"
    :width="width || 128"
    :height="height || 128"
    :loader="loader || 'dots'"
    :can-cancel="false"
    :is-full-page="!fullPage"
    v-model:active="isLoading"
  />
</template>

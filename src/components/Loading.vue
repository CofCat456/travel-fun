<script setup>
import 'vue-loading-overlay/dist/css/index.css';

import { ref } from 'vue';
import Loading from 'vue-loading-overlay';

defineProps({
  width: {
    type: Number,
    default: 128
  },
  height: {
    type: Number,
    default: 128
  },
  loader: {
    type: String,
    default: 'dots'
  },
  fullPage: {
    type: Boolean,
    default: true
  }
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
    :width="width"
    :height="height"
    :loader="loader"
    :can-cancel="false"
    :is-full-page="fullPage"
    v-model:active="isLoading"
  />
</template>

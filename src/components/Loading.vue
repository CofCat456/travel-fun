<script setup>
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

defineProps({
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
    v-model:active="isLoading"
    loader="dots"
    :width="128"
    :height="128"
    color="#0F4BB4"
    :can-cancel="false"
    :is-full-page="fullPage"
  />
</template>

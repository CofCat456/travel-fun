<script setup>
import { ref } from 'vue';

const isClick = ref(false);
</script>

<template>
  <button
    class="fixed bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-300 hover:scale-110"
    :class="{ rotate: isClick }"
    @click="isClick = true"
    @animationend="isClick = false"
  >
    <span style="font-size: 30px" class="material-icons-outlined text-cc-other-3"> add </span>
  </button>
</template>

<style>
.rotate {
  animation: rotate 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }
}
</style>

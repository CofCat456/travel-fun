<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </RouterView>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* fade-slide */
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

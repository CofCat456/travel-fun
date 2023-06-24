<script setup>
defineProps({
  center: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="mx-auto w-full px-3 md:px-4 lg:max-w-cc-width xl:px-0" :class="center && 'h-full'">
    <slot></slot>
  </div>
</template>

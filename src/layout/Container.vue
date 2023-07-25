<script setup>
defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="mx-auto w-full md:px-4 lg:max-w-cc-width xl:px-0"
    :class="[center && 'h-full', full ? 'px-0' : 'px-3']"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md'
  full?: boolean
  center?: boolean
}>(), {
  size: 'md',
});
</script>

<template>
  <div
    class="mx-auto w-full md:px-4 xl:px-0"
    :class="[
      size === 'md' ? 'lg:max-w-cc-width ' : 'lg:max-w-3xl',
      center ? 'h-full' : '',
      full ? 'px-0' : 'px-3',
    ]"
  >
    <slot />
  </div>
</template>

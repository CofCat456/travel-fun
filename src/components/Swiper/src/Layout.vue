<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

defineProps<{
  isNormal?: boolean
  isBanner?: boolean
  noPadding?: boolean
}>();
</script>

<template>
  <section
    class="mx-auto w-full"
    :class="[
      isNormal ? ' lg:max-w-cc-width' : ' lg:max-w-cc-big-width',
      noPadding ? 'p-0' : 'px-3 py-6 md:px-4 xl:px-0',
      isBanner ? 'md:py-6' : '',
    ]"
  >
    <slot />
    <div class="xl:mx-4">
      <slot name="title" />
    </div>
    <div class="relative" :class="[noPadding ? 'px-0' : isNormal ? 'md:px-4 xl:px-0' : 'xl:px-4']">
      <slot name="swiper" />
    </div>
    <slot name="btn" />
  </section>
</template>

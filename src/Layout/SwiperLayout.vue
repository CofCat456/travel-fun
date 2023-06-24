<script setup>
defineProps({
  isNormal: {
    type: Boolean,
    defalut: false
  }
});
</script>

<template>
  <section
    class="mx-auto w-full px-3 pb-8 md:py-6 md:px-4 xl:px-0"
    :class="isNormal ? ' lg:max-w-cc-width' : ' lg:max-w-cc-big-width'"
  >
    <slot></slot>
    <div class="relative" :class="isNormal ? 'md:px-4 xl:px-0' : 'px-0 xl:px-4'">
      <slot name="swiper"></slot>
    </div>
    <slot name="btn"> </slot>
  </section>
</template>

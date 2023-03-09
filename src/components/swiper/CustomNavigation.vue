<script setup>
const props = defineProps({
  classkey: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <button
    class="swiper-btn swiper-btn-shadow left-0 -translate-x-full"
    :class="`swiper-${props.classkey}-custom-prev`"
  >
    <img src="/icons/left-arrow.svg" alt="left-arrow-icon" class="mx-auto" />
  </button>
  <button
    class="swiper-btn swiper-btn-shadow right-0 translate-x-full"
    :class="`swiper-${props.classkey}-custom-next`"
  >
    <img src="/icons/right-arrow.svg" alt="left-arrow-icon" class="mx-auto" />
  </button>
</template>

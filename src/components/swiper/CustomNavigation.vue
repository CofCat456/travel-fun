<script setup>
// TODO: icon hover kkday
const props = defineProps({
  classkey: {
    type: String,
    default: ''
  },
  isBeginning: {
    type: Boolean,
    default: true
  },
  isEnd: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button
    class="swiper-btn swiper-btn-shadow group left-0 hidden -translate-x-full xl:block"
    :class="[`swiper-${props.classkey}-custom-prev`, isBeginning && 'xl:hidden']"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="mx-auto h-6 w-6 text-cc-other-5 transition-colors group-hover:text-[#32303C]"
    >
      <path
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </button>
  <button
    class="swiper-btn swiper-btn-shadow group right-0 hidden translate-x-full xl:block"
    :class="[`swiper-${props.classkey}-custom-next`, isEnd && 'xl:hidden']"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mx-auto h-6 w-6 text-cc-other-5 transition-colors group-hover:text-[#32303C]"
    >
      <path
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>
</template>

<style scoped>
.swiper-btn-shadow {
  box-shadow: 0px 0px 4px 0px #0000001f;
}
</style>

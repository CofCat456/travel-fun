<script setup lang="ts">
withDefaults(defineProps<{
  classkey: string
  opacity?: number
  isBeginning: boolean
  isEnd: boolean
  isNormal?: boolean
}>(), {
  opacity: 100,
  isBeginning: true,
});
</script>

<template>
  <button
    class="swiper-btn swiper-btn-shadow group hidden md:block"
    :class="[
      `swiper-${classkey}-custom-prev`,
      isBeginning && 'md:hidden',
      isNormal ? 'left-3 opacity-60' : 'left-0  -translate-x-full',
    ]"
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
    class="swiper-btn swiper-btn-shadow group hidden md:block"
    :class="[
      `swiper-${classkey}-custom-next`,
      isEnd && 'md:hidden',
      isNormal ? 'right-3 opacity-60' : 'right-0 translate-x-full ',
    ]"
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
.swiper-btn {
  @apply absolute top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white text-cc-other-9;
}

.swiper-btn-shadow {
  box-shadow: 0px 0px 4px 0px #0000001f;
}
</style>

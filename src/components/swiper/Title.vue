<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '最新旅遊優惠'
  },
  secTitle: {
    type: String,
    default: '旅行變得更簡單！我們提供最新的旅遊優惠，讓您輕鬆規劃完美的旅程！'
  }
});
</script>

<template>
  <div class="mx-4 mb-6 flex items-start gap-2">
    <div class="mt-2 h-2 w-2 bg-cc-primary" />
    <div>
      <h3 class="mb-2 font-bold">{{ props.title }}</h3>
      <h6 class="break-all text-cc-other-4">{{ props.secTitle }}</h6>
    </div>
  </div>
</template>

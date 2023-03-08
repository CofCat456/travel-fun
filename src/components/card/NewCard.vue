<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '活動名稱'
  },
  description: {
    type: String,
    default: '小標題'
  },
  images: {
    type: String,
    default: '/images/news/news_1.png'
  }
});
</script>

<template>
  <div
    class="group flex min-h-[240px] cursor-pointer flex-col items-start justify-between rounded-[10px] bg-cover p-3 text-white transition-all duration-300 hover:brightness-[.8]"
    :style="`background-image: url(${props.images})`"
  >
    <div class="rounded-[30px] bg-cc-accent px-3 py-1 text-sm leading-normal text-white">
      最新消息
    </div>
    <div>
      <p class="text-area-title font-bold">{{ props.title }}</p>
      <p class="text-sm leading-normal">{{ props.description }}</p>
      <button
        type="button"
        class="mt-2 rounded-[5px] bg-white py-2 px-4 text-cc-other-2 transition-colors duration-300 group-hover:bg-cc-primary group-hover:text-white"
      >
        查看更多
      </button>
    </div>
  </div>
</template>

<script setup>
import Search from './Search.vue';
</script>

<template>
  <!-- TODO: 裁減圖片 -->
  <div
    class="relative mb-[104px] flex h-[360px] w-full items-end bg-cover px-3 py-8"
    style="background-image: url(/images/banner.jpg); background-position: center -100px"
  >
    <div
      class="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-serif text-white"
    >
      <h1 class="text-title mb-4 flex flex-col justify-center sm:flex-row lg:gap-6">
        <span>旅遊趣</span>
        陪你去台灣各地
      </h1>
      <h2 class="text-sec-title">讓我們帶著你一同欣賞台灣的美</h2>
    </div>
    <Search />
  </div>
</template>

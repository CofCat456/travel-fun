<script setup></script>

<template>
  <div
    class="search-shadow flex w-full items-center rounded-m bg-white py-3 px-5 sm:absolute sm:left-1/2 sm:bottom-0 sm:max-w-[640px] sm:-translate-x-1/2 sm:translate-y-1/2"
  >
    <input
      type="text"
      class="flex-1 focus-visible:outline-none"
      placeholder="搜尋你想去的目的地 / 城市"
    />
    <button type="button" class="rounded-m bg-cc-accent px-6 py-[10.5px] text-white">搜尋</button>
  </div>
</template>

<style scoped>
.search-shadow {
  box-shadow: 0px 0px 20px 0px #00000033;
}
</style>
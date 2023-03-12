<script setup></script>

<template>
  <div
    class="search-shadow flex w-full items-center gap-2 rounded-m bg-white py-3 px-3 md:absolute md:left-1/2 md:bottom-0 md:max-w-[640px] md:-translate-x-1/2 md:translate-y-1/2 md:px-5"
  >
    <input
      type="text"
      class="w-0 flex-1 border-0 ring-0 focus:outline-0 focus:ring-0 focus-visible:outline-none"
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

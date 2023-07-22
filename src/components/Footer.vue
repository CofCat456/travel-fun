<script setup>
import { websiteConfig } from '@/config/website.config';
</script>

<template>
  <footer class="flex flex-col items-center bg-cc-other-2 p-4">
    <div class="mt-6 mb-10 flex items-center gap-8">
      <img class="h-10 object-cover" :src="websiteConfig.logo" alt="logo" />
      <ul class="flex items-center gap-4">
        <li
          v-for="item in websiteConfig.socia"
          :key="item.icon"
          class="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-cc-other-3 text-white transition-colors duration-300 hover:bg-cc-accent"
        >
          <a :href="item.href" target="_blank">
            <img :src="`/icons/${item.icon}.svg`" :alt="item.icon" />
          </a>
        </li>
      </ul>
    </div>
    <p class="text-center text-sm text-cc-other-3">
      此網站僅做為前端 Side Project 作品練習，不做商業用途，請勿用於商業用途，謝謝！
    </p>
  </footer>
</template>

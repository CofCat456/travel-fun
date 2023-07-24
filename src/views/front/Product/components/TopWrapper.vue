<script setup>
import { StarFilled } from '@vicons/material';
import { NIcon } from 'naive-ui';

defineProps({
  evaluate: Number,
  evaluateNum: Number,
  address: String
});
</script>

<template>
  <div class="mt-3 flex items-center gap-6">
    <div class="flex items-center">
      <div class="flex items-center">
        <n-icon size="20" color="#EE5220">
          <StarFilled />
        </n-icon>
        <span class="px-1 font-medium leading-5 text-cc-accent"> {{ evaluate }} </span>
      </div>
      <div class="ml-2 cursor-pointer">
        <span class="underline">({{ evaluateNum }} 則評價)</span>
      </div>
    </div>
    <div class="flex flex-1 cursor-pointer items-center whitespace-nowrap underline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
      <span class="ml-2">{{ address }}</span>
    </div>
    <div class="flex cursor-pointer items-center transition-colors hover:text-cc-accent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span class="ml-2 text-sm">加入我的最愛</span>
    </div>
  </div>
</template>

<script setup>
import { currency } from '@/utlis/global';

import FavouriteIcon from '../icons/FavouriteIcon.vue';
import FullStarIcon from '../icons/FullStarIcon.vue';

defineProps({
  title: {
    type: String,
    default: '活動名稱'
  },
  location: {
    type: String,
    default: '小標題'
  },
  evaluate: {
    type: Number,
    default: 0
  },
  evaluateTotal: {
    type: Number,
    default: 0
  },
  collectStatus: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0
  },
  originPrice: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: '/images/news/news_1.png'
  },
  ranking: {
    type: Number,
    default: 1
  }
});
</script>

<template>
  <div
    class="group relative flex cursor-pointer flex-col items-start transition-all duration-300 hover:brightness-[.8]"
  >
    <div
      class="text-sm-content absolute left-0 top-0 h-[25px] w-[25px] rounded-br-m bg-cc-accent text-center text-white"
    >
      {{ ranking }}
    </div>
    <div class="absolute top-[10px] right-[10px] text-white">
      <FavouriteIcon :status="collectStatus" />
    </div>
    <div
      class="mb-2 aspect-square w-full bg-cover bg-center"
      :style="`background-image: url(${image})`"
    />
    <div class="flex h-[120px] w-full flex-col gap-1 px-1">
      <div class="inline-flex gap-1 text-sm text-cc-other-4">
        <span class="material-icons-outlined icon-hover"> location_on </span>
        {{ location }}
      </div>
      <p class="text-sm-content flex-1 line-clamp-2">{{ title }}</p>
      <FullStarIcon :evaluate="evaluate" :evaluate-total="evaluateTotal" />
      <div class="inline-flex items-center gap-1">
        <h6>
          {{ currency(price, 'NT$ ') }}
        </h6>
        <p class="text-sm-content text-cc-other-4 line-through">
          {{ currency(price, '$') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.material-icons-outlined) {
  font-size: 20px;
}
</style>

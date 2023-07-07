<script setup>
import { useRouter } from 'vue-router';

import { currency } from '@/utlis/global';

import { cityMap } from '../../utlis/context';
import FavouriteIcon from '../Icons/FavouriteIcon.vue';
import FullStarIcon from '../Icons/FullStarIcon.vue';

defineProps({
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '活動名稱'
  },
  city: {
    type: String,
    default: ''
  },
  evaluate: {
    type: Number,
    default: 0
  },
  evaluateNum: {
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
  origin_price: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    default: '/images/news/news_1.png'
  },
  notRanking: {
    type: Boolean,
    default: false
  },
  ranking: {
    type: Number,
    default: 1
  }
});

const router = useRouter();

const goProduct = (id) => router.push({ name: 'Product', params: { productId: id } });
</script>

<template>
  <div
    class="group relative flex cursor-pointer flex-col items-start transition-all duration-300 hover:brightness-[.8]"
    @click="goProduct(id)"
  >
    <div
      v-if="!notRanking"
      class="text-sm-content absolute left-0 top-0 h-[25px] w-[25px] rounded-br-m bg-cc-accent text-center text-white"
    >
      {{ ranking }}
    </div>
    <div class="absolute top-[10px] right-[10px] text-white">
      <FavouriteIcon :status="collectStatus" />
    </div>
    <div
      class="mb-2 aspect-square w-full bg-cover bg-center"
      :style="`background-image: url(${imageUrl})`"
    />
    <div class="flex h-[120px] w-full flex-col gap-1 px-1">
      <div class="inline-flex gap-1 text-sm text-cc-other-4">
        <span class="material-icons-outlined icon-hover"> location_on </span>
        {{ cityMap.get(city) }}
      </div>
      <p class="text-sm-content line-clamp-2 flex-1">{{ title }}</p>
      <FullStarIcon :evaluate="evaluate" :evaluate-num="evaluateNum" />
      <div class="inline-flex items-center gap-1">
        <h6>
          {{ currency(price, 'NT$ ') }}
        </h6>
        <p class="text-sm-content text-cc-other-4 line-through">
          {{ currency(origin_price, '$') }}
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

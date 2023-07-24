<script setup>
import { FavoriteBorderOutlined, FavoriteOutlined, LocationOnOutlined } from '@vicons/material';
import { NIcon, NRate, NSpace } from 'naive-ui';
import { useRouter } from 'vue-router';

import { cityMap } from '@/utlis/context';
import { currency } from '@/utlis/global';
import { productProps } from '@/utlis/props';

const { id } = defineProps({
  ...productProps,
  notRanking: Boolean,
  ranking: Number
});

const router = useRouter();

const goProduct = () => router.push({ name: 'Product', params: { productId: id } });
</script>

<template>
  <div
    class="group relative flex cursor-pointer flex-col items-start transition-all duration-300 hover:brightness-[.8]"
    @click="goProduct"
  >
    <div
      v-if="!notRanking"
      class="text-sm-content absolute left-0 top-0 h-[25px] w-[25px] rounded-br-m bg-cc-accent text-center text-white"
    >
      {{ ranking }}
    </div>
    <div class="absolute top-[10px] right-[10px] text-white">
      <n-icon v-if="collectStatus" size="24" class="icon-hover">
        <FavoriteOutlined />
      </n-icon>
      <n-icon v-else size="20" class="icon-hover">
        <FavoriteBorderOutlined />
      </n-icon>
    </div>
    <div
      class="mb-2 aspect-square w-full bg-cover bg-center"
      :style="`background-image: url(${imageUrl})`"
    />
    <div class="flex h-[120px] w-full flex-col gap-1 px-1">
      <div class="inline-flex gap-1 text-sm text-cc-other-4">
        <n-icon size="20">
          <LocationOnOutlined />
        </n-icon>
        {{ cityMap.get(city) }}
      </div>
      <p class="text-sm-content line-clamp-2 flex-1">{{ title }}</p>
      <n-space size="small">
        <n-rate readonly allow-half size="small" :default-value="evaluate" />
        <p class="text-sm-content text-cc-accent">{{ evaluate.toFixed(1) }}</p>
        <p class="text-sm-content text-cc-other-3">({{ evaluateNum }})</p>
      </n-space>
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

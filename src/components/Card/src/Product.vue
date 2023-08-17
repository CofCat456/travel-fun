<script setup lang="ts">
import { FavoriteBorderOutlined, FavoriteOutlined, LocationOnOutlined } from '@vicons/material';
import { NIcon, NRate, NSpace } from 'naive-ui';

import { currency } from '@/utlis/global';
import { cityMap } from '@/utlis/context';
import { useGo } from '@/composables/go';
import type { Product } from '@/types';

defineProps<Product & {
  notRanking?: boolean
  ranking?: number
}>();

const { goProduct } = useGo();
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
      <NIcon v-if="collectStatus" size="24" class="icon-hover">
        <FavoriteOutlined />
      </NIcon>
      <NIcon v-else size="20" class="icon-hover">
        <FavoriteBorderOutlined />
      </NIcon>
    </div>
    <div
      class="mb-2 aspect-square w-full bg-cover bg-center"
      :style="`background-image: url(${imageUrl})`"
    />
    <div class="flex h-[120px] w-full flex-col gap-1 px-1">
      <div class="inline-flex gap-1 text-sm text-cc-other-4">
        <NIcon size="20">
          <LocationOnOutlined />
        </NIcon>
        {{ cityMap.get(city) }}
      </div>
      <p class="text-sm-content line-clamp-2 flex-1">
        {{ title }}
      </p>
      <NSpace size="small">
        <NRate readonly allow-half size="small" :default-value="evaluate" />
        <p class="text-sm-content text-cc-accent">
          {{ evaluate.toFixed(1) }}
        </p>
        <p class="text-sm-content text-cc-other-3">
          ({{ evaluateNum }})
        </p>
      </NSpace>
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

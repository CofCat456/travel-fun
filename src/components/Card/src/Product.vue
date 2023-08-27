<script setup lang="ts">
import { FavoriteBorderOutlined, FavoriteOutlined, LocationOnOutlined } from '@vicons/material';
import { NIcon, NRate, NSpace } from 'naive-ui';

import { currency } from '@/utils/global';
import { cityMap } from '@/utils/context';
import { useGo } from '@/composables/go';
import type { Product } from '@/types';
import { useFavoriteStore } from '@/stores';

defineProps<Product & { notRanking?: boolean
  ranking?: number
}>();

const favoriteStore = useFavoriteStore();

const { goProduct } = useGo();
const { addFavorite, removeFavorite, checkFavorite } = favoriteStore;
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
      <NIcon v-if="checkFavorite(id)" size="24" color="#EE5220" class="icon-hover">
        <FavoriteOutlined @click.stop="removeFavorite(id, title)" />
      </NIcon>
      <NIcon v-else class="icon-hover" size="24">
        <FavoriteBorderOutlined @click.stop="addFavorite(id, title)" />
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
          {{ currency(price) }}
        </h6>
        <p class="text-sm-content text-cc-other-4 line-through">
          {{ currency(origin_price, '$') }}
        </p>
      </div>
    </div>
  </div>
</template>

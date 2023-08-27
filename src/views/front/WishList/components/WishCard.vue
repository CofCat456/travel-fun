<script setup lang="ts">
import { NCard, NEllipsis, NIcon, NRate, NSpace } from 'naive-ui';

import { DateRangeOutlined, FavoriteBorderOutlined, FavoriteOutlined, LocationOnOutlined } from '@vicons/material';
import type { Product } from '@/types';
import { cityMap } from '@/utils/context';
import { currency, formatDate2YMD } from '@/utils/global';
import { useFavoriteStore } from '@/stores';

defineProps<Product>();

const favoriteStore = useFavoriteStore();

const { checkFavorite, addFavorite, removeFavorite } = favoriteStore;
</script>

<template>
  <NCard hoverable content-style="padding: 0;">
    <div class="flex rounded-m overflow-hidden gap-3">
      <img class="img w-1/3 h-[200px]" :src="imageUrl">
      <div class="flex relative p-4 flex-col justify-between">
        <div class="flex flex-col gap-3">
          <h6 class="font-bold">
            {{ title }}
          </h6>
          <NEllipsis :line-clamp="3">
            {{ description }}
          </NEllipsis>
          <div class="flex items-center gap-3">
            <div class="inline-flex text-cc-other-4 items-center gap-1">
              <NIcon :size="20">
                <LocationOnOutlined />
              </NIcon>
              {{ cityMap.get(city) }}
            </div>
            <div class="inline-flex text-cc-other-4 items-center gap-1">
              <NIcon :size="20">
                <DateRangeOutlined />
              </NIcon>
              可預訂時間：{{ formatDate2YMD(date) }}
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <NSpace size="small">
            <NRate readonly allow-half size="small" :default-value="evaluate" />
            <p class="text-sm-content text-cc-other-3">
              ({{ evaluateNum }})
            </p>
          </NSpace>
          <h5 class="font-bold">
            {{ currency(price, 'NT$ ') }}
          </h5>
        </div>
        <div class="absolute top-[10px] right-[10px] text-white">
          <NIcon v-if="checkFavorite(id)" size="24" color="#EE5220" class="icon-hover">
            <FavoriteOutlined @click.stop="removeFavorite(id, title)" />
          </NIcon>
          <NIcon v-else class="icon-hover" size="24">
            <FavoriteBorderOutlined @click.stop="addFavorite(id, title)" />
          </NIcon>
        </div>
      </div>
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { NButton, NEllipsis, NIcon, NRate, NSpace, NThing, NTime } from 'naive-ui';

import { DateRangeOutlined, FavoriteOutlined, LocationOnOutlined } from '@vicons/material';
import type { Product } from '@/types';
import { cityMap } from '@/utils/context';
import { currency } from '@/utils/global';
import { useFavoriteStore } from '@/stores';

defineProps<Product>();

const favoriteStore = useFavoriteStore();

const { removeFavorite } = favoriteStore;
</script>

<template>
  <NThing :title="title">
    <template #header-extra>
      <NButton text @click.stop="removeFavorite(id, title)">
        <NIcon size="24" color="#EE5220" class="icon-hover">
          <FavoriteOutlined />
        </NIcon>
      </NButton>
    </template>
    <template #description>
      <NEllipsis :line-clamp="3">
        {{ description }}
      </NEllipsis>
    </template>
    <template #footer>
      <div class="flex justify-between items-center">
        <NSpace size="small">
          <NRate readonly allow-half size="small" :default-value="evaluate" />
          <p class="text-sm-content text-cc-other-3">
            ({{ evaluateNum }})
          </p>
        </NSpace>
        <h5 class="font-bold">
          {{ currency(price) }}
        </h5>
      </div>
    </template>
    <div class="flex flex-col gap-3">
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
          可預訂時間：<NTime :time="date" format="yyyy 年 MM 月 dd 日" />
        </div>
      </div>
    </div>
  </NThing>
</template>

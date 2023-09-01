<script setup lang="ts">
import { FavoriteBorderOutlined, FavoriteOutlined, LocationOnOutlined, StarFilled } from '@vicons/material';
import { NIcon } from 'naive-ui';
import { scrollTo } from '@/utils/global';
import { useFavoriteStore } from '@/stores';

defineProps<{
  isMobile: boolean
  id: string
  title: string
  evaluate: number
  evaluateNum: number
  address: string
}>();

const favoriteStore = useFavoriteStore();

const { addFavorite, removeFavorite, checkFavorite } = favoriteStore;

function toggleFavoriteHandler(id: string, title: string) {
  if (checkFavorite(id))
    removeFavorite(id, title);
  else
    addFavorite(id, title);
};
</script>

<template>
  <div class="mt-3 flex items-center gap-6">
    <div class="flex items-center">
      <div class="flex items-center">
        <NIcon size="20" color="#EE5220">
          <StarFilled />
        </NIcon>
        <span class="px-1 font-medium leading-5 text-cc-accent"> {{ evaluate }} </span>
      </div>
      <div class="ml-2 cursor-pointer">
        <span class="underline">({{ evaluateNum }} 則評價)</span>
      </div>
    </div>
    <div v-if="!isMobile" class="flex flex-1 cursor-pointer items-center whitespace-nowrap underline">
      <NIcon size="24">
        <LocationOnOutlined />
      </NIcon>
      <span class="ml-2" @click="scrollTo('map')">{{ address }}</span>
    </div>
    <div v-if="!isMobile" class="flex cursor-pointer items-center transition-colors" :class="checkFavorite(id) ? 'text-cc-accent' : 'hover:text-cc-accent'" @click="toggleFavoriteHandler(id, title)">
      <NIcon v-if="checkFavorite(id)" size="24" class="icon-hover">
        <FavoriteOutlined />
      </NIcon>
      <NIcon v-else class="icon-hover" size="24">
        <FavoriteBorderOutlined />
      </NIcon>
      <span class="ml-2 text-sm">加入我的最愛</span>
    </div>
  </div>
</template>

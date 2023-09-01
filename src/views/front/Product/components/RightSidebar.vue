<script setup lang="ts">
import { NAffix, NIcon } from 'naive-ui';
import type { AffixProps } from 'naive-ui';

import { computed } from 'vue';
import { FavoriteBorderOutlined, FavoriteOutlined } from '@vicons/material';
import Button from '@/components/Base/Button.vue';
import { currency, scrollTo } from '@/utils/global';
import { useFavoriteStore } from '@/stores';

const { isMobile } = defineProps<{
  isMobile: boolean
  id: string
  title: string
  price: number
  originPrice: number
}>();

const favoriteStore = useFavoriteStore();

const { checkFavorite, addFavorite, removeFavorite } = favoriteStore;

const getBindValues = computed<AffixProps>(() => {
  return {
    triggerBottom: isMobile ? 9999 : undefined,
    top: isMobile ? undefined : 100,
    bottom: isMobile ? 0 : undefined,
  };
});
</script>

<template>
  <NAffix class="w-full md:w-[300px] inset-x-0 md:inset-x-auto z-40" v-bind="getBindValues">
    <div class="flex items-center gap-x-10 md:flex-col md:items-start md:gap-x-0 md:rounded-2xl border border-cc-other-5/50 bg-cc-other-1 px-5 py-2 md:p-5">
      <template v-if="isMobile">
        <NIcon v-if="checkFavorite(id)" size="24" color="#EE5220" class="icon-hover">
          <FavoriteOutlined @click.stop="removeFavorite(id, title)" />
        </NIcon>
        <NIcon v-else class="icon-hover" size="24">
          <FavoriteBorderOutlined @click.stop="addFavorite(id, title)" />
        </NIcon>
      </template>
      <div v-else class="mb-4">
        <span class="mr-1 text-2xl font-bold">{{ currency(price) }}</span>
        <span class="text-sm text-cc-other-4 line-through">
          {{ currency(originPrice) }}
        </span>
      </div>
      <Button is-full @click="scrollTo('plan')">
        選擇方案
      </Button>
    </div>
  </NAffix>
</template>

<script setup lang="ts">
import {
  ShoppingCartOutlined,
} from '@vicons/material';
import type { TooltipProps } from 'naive-ui';
import { NBadge, NCard, NEllipsis, NEmpty, NIcon, NScrollbar, NSkeleton, NTooltip } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import { currency } from '@/utils/global';
import { useCartStore } from '@/stores';

import { useGo } from '@/composables/go';

type TooltipThemeOverrides = NonNullable<TooltipProps['themeOverrides']>

const cartStore = useCartStore();

const { cartList, totalNum, isLoading } = storeToRefs(cartStore);

const tooltipThemeOverrides: TooltipThemeOverrides = {
  padding: '0px',
  color: '#fff',
};

const { goProduct } = useGo();
</script>

<template>
  <NTooltip
    placement="bottom"
    trigger="hover"
    :theme-overrides="tooltipThemeOverrides"
    :style="{ width: '400px' }"
  >
    <template #trigger>
      <NBadge color="#EE5220" :max="10" :value="totalNum">
        <NIcon size="24" color="white" class="cursor-pointer">
          <ShoppingCartOutlined />
        </NIcon>
      </NBadge>
    </template>
    <NCard
      embedded
      :bordered="false"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      size="small"
    >
      <NSkeleton v-if="isLoading" text :repeat="6" />
      <template v-else>
        <ul v-if="totalNum">
          <NScrollbar style="max-height: 340px">
            <li
              v-for="{ id, product }, index in cartList"
              :key="id"
              class="py-5 flex items-start gap-5 cursor-pointer"
              :class="index !== cartList.length - 1 ? 'border-b' : ''"
              @click="goProduct(product?.id!)"
            >
              <div class="w-14 aspect-square">
                <img class="img" :src="product?.imageUrl">
              </div>
              <div class="flex-1 space-y-1">
                <h6 class="text-sm-content">
                  {{ product?.title }}
                </h6>
                <NEllipsis style="max-width: 240px">
                  {{ product?.description }}
                </NEllipsis>
                <p class="text-cc-primary font-bold">
                  {{ currency(product?.price!, 'NT$ ') }}
                </p>
              </div>
              <div />
            </li>
          </NScrollbar>
        </ul>
        <NEmpty v-else description="您的購物車是空的" />
      </template>
      <template #footer>
        <NSkeleton v-if="isLoading" text />
        <div v-else class="flex items-center justify-between">
          共 {{ totalNum }} 件商品
          <RouterLink class="btn" :to="{ name: 'Cart' }">
            前往購物車
          </RouterLink>
        </div>
      </template>
    </NCard>
  </NTooltip>
</template>

<script setup lang="ts">
import {
  ShoppingCartOutlined,
} from '@vicons/material';
import type { TooltipProps } from 'naive-ui';
import { NBadge, NButton, NCard, NDrawer, NDrawerContent, NEllipsis, NEmpty, NIcon, NList, NListItem, NScrollbar, NThing, NTooltip } from 'naive-ui';
import { RouterLink, onBeforeRouteUpdate } from 'vue-router';
import { reactive } from 'vue';
import { currency } from '@/utils/global';

import type { Cart, DrawerActive } from '@/types';

type TooltipThemeOverrides = NonNullable<TooltipProps['themeOverrides']>

defineProps<{
  totalNum: number
  cartList: Cart[]
  isMobile: boolean
}>();

const emit = defineEmits<{
  (e: 'active', target: string): void
}>();

const tooltipThemeOverrides: TooltipThemeOverrides = {
  padding: '0px',
  color: '#fff',
};

const activate: DrawerActive = reactive({
  active: false,
  placement: 'bottom',
});

function toggleActive() {
  if (!activate.active)
    emit('active', 'cart');

  activate.active = !activate.active;
};

const closeActive = () => activate.active = false;

onBeforeRouteUpdate(() => {
  closeActive();
});

defineExpose({
  closeActive,
});
</script>

<template>
  <NTooltip
    v-if="!isMobile"
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
      <template v-if="totalNum">
        <NScrollbar style="max-height: 340px">
          <NList hoverable clickable>
            <template
              v-for="{ product } in cartList"
              :key="product?.id"
            >
              <NListItem>
                <template #prefix>
                  <div class="w-14 aspect-square">
                    <img class="img" :src="product?.imageUrl">
                  </div>
                </template>
                <NThing :title="product?.title">
                  <template #description>
                    <NEllipsis style="max-width: 240px">
                      {{ product?.description }}
                    </NEllipsis>
                  </template>
                  <p class="text-cc-primary font-bold">
                    {{ currency(product?.price!) }}
                  </p>
                </NThing>
                <div />
              </NListItem>
            </template>
          </NList>
        </NScrollbar>
      </template>
      <NEmpty v-else description="您的購物車是空的" />
      <template #footer>
        <div class="flex items-center justify-between">
          共 {{ totalNum }} 件商品
          <RouterLink class="btn" :to="{ name: 'Cart' }">
            前往購物車
          </RouterLink>
        </div>
      </template>
    </NCard>
  </NTooltip>
  <template v-else>
    <NButton text @click="toggleActive">
      <NBadge color="#EE5220" :max="10" :value="totalNum">
        <NIcon size="24" color="white" class="cursor-pointer">
          <ShoppingCartOutlined />
        </NIcon>
      </NBadge>
    </NButton>
    <NDrawer
      v-model:show="activate.active"
      style="top: 64px"
      height="undefined"
      :show-mask="false"
      :mask-closable="false"
      :placement="activate.placement"
    >
      <NDrawerContent title="購物車" footer-style="justify-content: space-between; align-items: center;">
        <template v-if="totalNum">
          <NList hoverable clickable>
            <template
              v-for="{ product }, index in cartList"
              :key="product?.id"
            >
              <RouterLink v-slot="{ navigate }" custom :to="{ name: 'Product', params: { productId: product?.id } }">
                <NListItem
                  class="py-5 flex gap-5 cursor-pointer"
                  :class="index !== cartList.length - 1 ? 'border-b' : ''"
                  @click="navigate"
                >
                  <template #prefix>
                    <div class="w-28 aspect-square rounded-m overflow-hidden">
                      <img class="img" :src="product?.imageUrl">
                    </div>
                  </template>
                  <NThing :title="product?.title">
                    <template #description>
                      <NEllipsis class="text-sm" :line-clamp="2" :tooltip="false">
                        {{ product?.description }}
                      </NEllipsis>
                    </template>
                    <p class="text-cc-primary font-bold">
                      {{ currency(product?.price!) }}
                    </p>
                  </NThing>
                  <div />
                </NListItem>
              </RouterLink>
            </template>
          </NList>
        </template>
        <NEmpty v-else description="您的購物車是空的" />
        <template #footer>
          共 {{ totalNum }} 件商品
          <RouterLink class="btn" :to="{ name: 'Cart' }">
            前往購物車
          </RouterLink>
        </template>
      </NDrawerContent>
    </NDrawer>
  </template>
</template>

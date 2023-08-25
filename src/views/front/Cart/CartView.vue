<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NButton, NCard, NEmpty, NIcon } from 'naive-ui';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { KeyboardArrowRightOutlined } from '@vicons/material';
import Carts from './components/Carts.vue';
import Container from '@/layout/Container.vue';
import { currency } from '@/utils/global';

import { SwiperProduct } from '@/components/Swiper';

import { useCartStore, useProductStore } from '@/stores';
import { apiUserDelCarts } from '@/utils/api';

const productStore = useProductStore();
const cartStore = useCartStore();

const { getByRecommended } = storeToRefs(productStore);
const { cartList, finalTotal } = storeToRefs(cartStore);

const { getFilterData } = productStore;
const { getCarts } = cartStore;

const isLoading = ref(false);

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home',
  },
  {
    title: '購物車',
  },
]);

async function deleteCarts() {
  isLoading.value = true;

  try {
    const res = await apiUserDelCarts();

    const {
      data: { success },
    } = res;

    if (success)
      getCarts();
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="bg-cc-other-7/80 py-5">
    <Container>
      <NBreadcrumb separator=">">
        <template v-for="{ title, pathName } in getBreadcrumbs" :key="title">
          <NBreadcrumbItem v-if="pathName">
            <RouterLink :to="{ name: pathName }">
              {{ title }}
            </RouterLink>
          </NBreadcrumbItem>
          <NBreadcrumbItem v-else>
            {{ title }}
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
      <NCard
        class="my-5"
        title="購物車"
        size="medium"
        :bordered="false"
        :segmented="{
          content: true,
          footer: true,
        }"
      >
        <Carts v-if="cartList?.length !== 0" :cart-list="cartList" @delete="getCarts" />
        <NEmpty v-else class="py-5" description="您的購物車是空的" />
        <template v-if="cartList?.length !== 0" #footer>
          <div class="flex flex-col items-baseline gap-2">
            <NButton text :loading="isLoading" @click="deleteCarts">
              清空購物車
            </NButton>
            <div class="w-full inline-flex items-center justify-end">
              <div class="inline-flex items-end gap-1">
                <span>{{ cartList.length }} 件商品合計</span>
                <h4 class="text-cc-primry font-bold">
                  {{ currency(finalTotal, 'NT$ ') }}
                </h4>
              </div>
              <RouterLink :to="{ name: 'Order' }" class="btn ml-2">
                前往結賬
              </RouterLink>
            </div>
          </div>
        </template>
      </NCard>
      <RouterLink class="text-right font-bold justify-end text-cc-primary hover:opacity-80 flex items-center" :to="{ name: 'CountryProducts', params: { countryName: 'taiwan' } }">
        繼續購物
        <NIcon size="24">
          <KeyboardArrowRightOutlined />
        </NIcon>
      </RouterLink>
    </Container>
    <SwiperProduct
      class="mt-10"
      title="更多推薦"
      :products="getFilterData(getByRecommended, '')"
    />
  </section>
</template>

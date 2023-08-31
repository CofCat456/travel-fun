<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NButton, NCard, NEmpty, NIcon } from 'naive-ui';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { KeyboardArrowRightOutlined } from '@vicons/material';
import Carts from './components/Carts.vue';
import Container from '@/layout/Container.vue';
import { currency } from '@/utils/global';

import { SwiperProduct } from '@/components/Swiper';

import { useCartStore, useDeviceStore, useProductStore } from '@/stores';
import { apiUserDelCarts } from '@/utils/api';
import Button from '@/components/Base/Button.vue';

const cartStore = useCartStore();
const deviceStore = useDeviceStore();
const productStore = useProductStore();

const { cartList, finalTotal } = storeToRefs(cartStore);
const { isMobile } = storeToRefs(deviceStore);
const { getByRecommended } = storeToRefs(productStore);

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

const getCardSize = computed(() => isMobile.value ? 'small' : 'medium');

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
        :size="getCardSize"
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
            <NButton quaternary type="primary" :loading="isLoading" @click="deleteCarts">
              清空購物車
            </NButton>
            <div class="w-full inline-flex justify-between items-center">
              <div class="inline-flex items-end gap-2">
                <span class="text-sm-content">{{ cartList.length }} 件商品合計</span>
                <p class="text-area-title text-cc-primry font-bold">
                  {{ currency(finalTotal) }}
                </p>
              </div>
              <RouterLink v-slot="{ navigate }" custom :to="{ name: 'Order' }">
                <Button @click="navigate">
                  前往結賬
                </Button>
              </RouterLink>
            </div>
          </div>
        </template>
      </NCard>
      <RouterLink class="text-right font-bold justify-end text-cc-primary hover:opacity-80 flex items-center" :to="{ name: 'CountryProducts', params: { countryName: 'taiwan' } }">
        <NButton text type="primary" icon-placement="right">
          繼續購物
          <template #icon>
            <NIcon size="24">
              <KeyboardArrowRightOutlined />
            </NIcon>
          </template>
        </NButton>
      </RouterLink>
    </Container>
    <SwiperProduct
      class="mt-10"
      title="更多推薦"
      :products="getFilterData(getByRecommended, '')"
    />
  </section>
</template>

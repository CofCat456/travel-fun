<script setup lang="ts">
import {
  NCard,
  NEllipsis,
  NIcon,
  NResult,
  useLoadingBar,
} from 'naive-ui';

import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { DateRangeOutlined, PeopleOutlineFilled } from '@vicons/material';
import { storeToRefs } from 'pinia';
import { apiUserGetOrder } from '@/utils/api';
import type { Order } from '@/types';
import { currency } from '@/utils/global';
import { useProductStore } from '@/stores';
import { SwiperProduct } from '@/components/Swiper';

const route = useRoute();

const productStore = useProductStore();

const loadingBar = useLoadingBar();

const { getByRecommended } = storeToRefs(productStore);

const { getFilterData } = productStore;

const orderValue: Order = reactive({
  create_at: 0,
  id: '',
  is_paid: false,
  message: '',
  num: 0,
  products: {},
  total: 0,
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
});

const getResultDesc = computed(() => `訂單明細將寄至： ${orderValue.user.email}`);

async function getOrder() {
  loadingBar.start();

  const { orderId } = route.params;

  try {
    const res = await apiUserGetOrder(orderId as string);

    const {
      data: { order, success },
    } = res;

    if (success)
      Object.assign(orderValue, order);
  }
  catch {
    loadingBar.error();
  }
  finally {
    loadingBar.finish();
  }
}

onMounted(() => {
  getOrder();
});
</script>

<template>
  <NCard
    :bordered="false"
    :segmented="{
      content: true,
      footer: true,
    }"
  >
    <NResult class="mb-8" status="success" size="small" title="訂購成功" :description="getResultDesc" />
    <template v-for="({ final_total, product }, id) in orderValue.products" :key="id">
      <NCard
        size="small"
        hoverable
        :segmented="{
          content: true,
        }"
      >
        <template #header>
          <p class="text-sm-content text-cc-other-4">
            訂單編號：#{{ id }}
          </p>
        </template>
        <div class="flex items-start gap-x-4">
          <div class="w-20 aspect-[4/3] rounded-m overflow-hidden">
            <img class="img" :src="product.imageUrl">
          </div>
          <div class="flex-1 flex flex-col justify-start space-y-2">
            <h6 class="font-bold">
              {{ product.title }}
            </h6>
            <NEllipsis style="max-width: 240px">
              {{ product.description }}
            </NEllipsis>
            <div class="flex gap-6 items-center">
              <div class="inline-flex items-center gap-2">
                <NIcon size="20">
                  <DateRangeOutlined />
                </NIcon>
                可預訂時間：<NTime :time="product.date" format="yyyy 年 MM 月 dd 日" />
              </div>
              <div class="inline-flex items-center gap-2">
                <NIcon size="20">
                  <PeopleOutlineFilled />
                </NIcon>
                <!-- TODO: product 人數 -->
                人數 1 人
              </div>
              <p class="flex-1 text-cc-primary text-right font-bold">
                {{ currency(final_total) }}
              </p>
            </div>
          </div>
        </div>
      </NCard>
    </template>

    <template #footer>
      <div class="flex justify-between item-center">
        <h6 class="font-bold">
          付款金額
        </h6>
        <h5 class="font-bold text-cc-primary">
          {{ currency(orderValue.total!) }}
        </h5>
      </div>
    </template>
  </NCard>
  <SwiperProduct
    title="其他旅客觀看了"
    :slides-per-view="4"
    :slides-per-group="4"
    :products="getFilterData(getByRecommended)"
  />
</template>

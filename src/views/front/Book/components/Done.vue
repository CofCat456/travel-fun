<script setup lang="ts">
import {
  NCard,
  NEllipsis,
  NIcon,
  NList,
  NListItem,
  NResult,
  NSkeleton,
  NThing,
  NTime,
  useLoadingBar,
} from 'naive-ui';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { DateRangeOutlined, PeopleOutlineFilled } from '@vicons/material';
import { storeToRefs } from 'pinia';
import { apiUserGetOrder } from '@/utils/api';
import type { Order } from '@/types';
import { currency } from '@/utils/global';
import { useDeviceStore, useProductStore } from '@/stores';
import { SwiperProduct } from '@/components/Swiper';

const route = useRoute();

const deviceStore = useDeviceStore();
const productStore = useProductStore();

const loadingBar = useLoadingBar();

const { isMobile } = storeToRefs(deviceStore);
const { getByRecommended } = storeToRefs(productStore);

const { getFilterData } = productStore;

const isLoading = ref(false);

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
  isLoading.value = true;

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
    isLoading.value = false;
  }
}

onMounted(() => {
  getOrder();
});
</script>

<template>
  <NCard
    size="small"
    :bordered="false"
    :segmented="{
      content: true,
      footer: true,
    }"
  >
    <NResult class="mb-8" status="success" size="small" title="訂購成功" :description="getResultDesc" />
    <NList hoverable bordered>
      <template #header>
        <NSkeleton v-if="isLoading" text :width="isMobile ? '100%' : '30%'" />
        <p v-else class="text-sm-content text-cc-other-4">
          訂單編號：#{{ orderValue.id }}
        </p>
      </template>
      <template v-if="isLoading">
        <div class="flex items-center gap-3 p-3">
          <NSkeleton v-if="!isMobile" width="160px" height="120px" :sharp="false" />
          <div class="flex-1">
            <NSkeleton text :repeat="5" />
          </div>
        </div>
      </template>
      <template v-else>
        <template v-for="({ final_total, product }, id) in orderValue.products" :key="id">
          <NListItem>
            <template v-if="!isMobile" #prefix>
              <div class="w-40 aspect-[4/3] rounded-m overflow-hidden">
                <img class="img" :src="product?.imageUrl">
              </div>
            </template>
            <NThing :title="product?.title">
              <template #description>
                <p class="text-sm-content text-cc-other-4">
                  產品編號：#{{ id }}
                </p>
              </template>
              <NEllipsis style="max-width: 240px">
                {{ product.description }}
              </NEllipsis>
              <template #footer>
                <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
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
                </div>
              </template>
              <template #action>
                <p class="flex-1 text-cc-primary text-right font-bold">
                  {{ currency(final_total) }}
                </p>
              </template>
            </NThing>
          </NListItem>
        </template>
      </template>
    </NList>

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

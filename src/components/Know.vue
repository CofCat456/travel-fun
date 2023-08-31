<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '../types';

import { ProductMap } from '@/components/Map';
import Container from '@/layout/Container.vue';

defineProps<{
  name: string
  isMobile: boolean
  products: Product[]
}>();

const productMap = ref<InstanceType<typeof ProductMap>>();
</script>

<template>
  <div class="my-6 bg-cc-other-7/80 py-6">
    <Container>
      <h3 class="mb-3 text-xl font-bold md:my-6 md:text-[28px]">
        認識 {{ name }}
      </h3>
      <div
        class="flex min-h-[240px] flex-col flex-wrap gap-8 overflow-hidden md:mb-6 md:flex-row md:gap-0 md:rounded-m md:shadow-md"
      >
        <p
          class="flex-1 break-all rounded-m bg-white p-4 text-base leading-relaxed shadow-md md:rounded-none md:p-6 md:shadow-none"
        >
          新北市有許多知名觀光景點。體驗原住民文化、享受泡湯的烏來，懷舊風情的九份，感受大自然力量的東北角、野柳，鶯歌陶瓷、三峽老街等。都是假日散心的好去處。嚴選新北市自由行特色商品及活動行程，讓你與親朋好友搭乘便利交通工具輕鬆出遊新北市，享用特色美食，自由行就是這麼簡單！
        </p>
        <div
          v-if="productMap"
          class="relative h-28 cursor-pointer rounded-m bg-no-repeat object-cover object-center shadow-md transition-all duration-300 hover:brightness-[.8] md:h-auto md:w-96 md:rounded-none md:shadow-none"
          style="
            background-image: linear-gradient(90deg, #fff7eb, rgba(255, 247, 234, 0.2)),
              url(/images/map.jpg);
          "
          @click="productMap.openMap"
        >
          <div
            class="absolute bottom-1/2 left-6 translate-y-1/2 font-bold md:left-auto md:bottom-6 md:right-6 md:translate-y-0"
          >
            <h4 class="mb-2 text-lg md:text-2xl">
              看地圖搜尋{{ name }}活動
            </h4>
            <p class="flex items-center gap-1">
              點擊前往
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </Container>
    <ProductMap ref="productMap" :is-mobile="isMobile" :products="products || []" />
  </div>
</template>

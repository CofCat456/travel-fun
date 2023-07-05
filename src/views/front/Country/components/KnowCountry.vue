<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import Container from '@/Layout/Container.vue';

import Modal from '@/components/Modal/Modal.vue';
import ProductMap from '@/components/ProductMap.vue';

import useDebiveStore from '@/stores/device';

const props = defineProps({
  cityName: {
    type: String,
    default: ''
  },
  products: {
    type: Array,
    default: () => []
  }
});

const deviceStore = useDebiveStore();

const { isMobile } = storeToRefs(deviceStore);

const mapRef = ref(null);
const mobileMapRef = ref(null);

const getTitle = computed(() => `認識 ${props.cityName}`);

const openMap = () => (isMobile.value ? mobileMapRef.value.show() : mapRef.value.show());
const hideMap = () => (isMobile.value ? mobileMapRef.value.hide() : mapRef.value.hide());
</script>

<template>
  <div class="my-6 bg-cc-other-7 py-6">
    <Container>
      <h3 class="mb-3 text-xl font-bold md:my-6 md:text-[28px]">{{ getTitle }}</h3>
      <div
        class="flex min-h-[240px] flex-col flex-wrap gap-8 overflow-hidden md:mb-6 md:flex-row md:gap-0 md:rounded-m md:shadow-md"
      >
        <p
          class="flex-1 break-all rounded-m bg-white p-4 text-base leading-relaxed shadow-md md:rounded-none md:p-6 md:shadow-none"
        >
          新北市有許多知名觀光景點。體驗原住民文化、享受泡湯的烏來，懷舊風情的九份，感受大自然力量的東北角、野柳，鶯歌陶瓷、三峽老街等。都是假日散心的好去處。嚴選新北市自由行特色商品及活動行程，讓你與親朋好友搭乘便利交通工具輕鬆出遊新北市，享用特色美食，自由行就是這麼簡單！
        </p>
        <div
          class="relative h-28 cursor-pointer rounded-m bg-no-repeat object-cover object-center shadow-md transition-all duration-300 hover:brightness-[.8] md:h-auto md:w-96 md:rounded-none md:shadow-none"
          style="
            background-image: linear-gradient(90deg, #fff7eb, rgba(255, 247, 234, 0.2)),
              url(/images/map.jpg);
          "
          @click="openMap"
        >
          <div
            class="absolute bottom-1/2 left-6 translate-y-1/2 font-bold md:left-auto md:bottom-6 md:right-6 md:translate-y-0"
          >
            <h4 class="mb-2 text-lg md:text-2xl">看地圖搜尋{{ cityName }}活動</h4>
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
    <Modal v-if="isMobile" id="mobileMap" ref="mobileMapRef" no-scroll screen="screen">
      <template v-slot:content>
        <button
          type="button"
          class="fixed top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cc-other-1 shadow-2xl"
          @click="hideMap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <ProductMap />
      </template>
    </Modal>
    <Modal v-else id="map" ref="mapRef" no-scroll screen="screen">
      <template v-slot:content>
        <ProductMap />
        <button
          type="button"
          class="absolute -top-3 -right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cc-other-2 text-cc-other-1 shadow-2xl"
          @click="hideMap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </template>
    </Modal>
  </div>
</template>

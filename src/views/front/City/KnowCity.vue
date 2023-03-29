<script setup>
import { computed, ref } from 'vue';

import Container from '@/Layout/Container.vue';

import Modal from '@/components/Modal/Modal.vue';
import ProductMap from '@/components/ProductMap.vue';

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

const showed = ref(false);

const getTitle = computed(() => `認識 ${props.cityName}`);

function openModal() {
  showed.value = true;
}
</script>

<template>
  <div class="my-6 bg-cc-other-7 py-6">
    <Container>
      <h3 class="my-6 font-bold">{{ getTitle }}</h3>
      <div class="mb-6 flex min-h-[240px] items-stretch rounded-m bg-white shadow">
        <div class="flex-1 break-all p-6 text-base leading-relaxed">
          新北市有許多知名觀光景點。體驗原住民文化、享受泡湯的烏來，懷舊風情的九份，感受大自然力量的東北角、野柳，鶯歌陶瓷、三峽老街等。都是假日散心的好去處。嚴選新北市自由行特色商品及活動行程，讓你與親朋好友搭乘便利交通工具輕鬆出遊新北市，享用特色美食，自由行就是這麼簡單！
        </div>
        <div
          class="relative w-96 cursor-pointer bg-no-repeat object-cover object-center transition-all duration-300 hover:brightness-[.8]"
          style="
            background-image: linear-gradient(90deg, #fff7eb, rgba(255, 247, 234, 0.2)),
              url(/images/map.jpg);
          "
          @click="openModal"
        >
          <div class="absolute bottom-6 right-6 font-bold">
            <h4 class="mb-2">看地圖搜尋{{ cityName }}活動</h4>
            <p class="flex items-center justify-end gap-1">
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
    <Modal no-scroll screen :showModal="showed" @closing="showed = false">
      <template v-slot:content>
        <ProductMap :products="products" />
      </template>
    </Modal>
  </div>
</template>

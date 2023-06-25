<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import Container from '@/Layout/Container.vue';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Modal from '@/components/Modal/Modal.vue';
import ProductMap from '@/components/ProductMap.vue';
import ProductCard from '@/components/Card/ProductCard.vue';
import SwiperCategory from '@/components/Swiper/SwiperCategory.vue';

import useProductStore from '@/stores/product';

import { cityMap, categoryMap } from '@/utlis/context';
import { filterProduct } from '@/utlis/global';

import Menu from './components/Menu.vue';
import Filter from './components/Filter.vue';

const props = defineProps({
  sort: {
    type: String,
    default: ''
  }
});

const route = useRoute();
const router = useRouter();

const product = useProductStore();

const showed = ref(false);

const { getSortRate, getSortRateNum, getSortPriceTo } = storeToRefs(product);

const getCityName = computed(() => cityMap.get(route.params.cityName));
const getCategory = computed(() => categoryMap.get(route.params.category) ?? '所有活動');
const getCategorys = computed(() => ['', ...categoryMap.keys()]);
const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home'
  },
  {
    title: getCityName.value,
    pathName: 'City',
    params: { cityName: route.params.cityName }
  },
  {
    title: getCategory.value
  }
]);

const getSortProduct = computed(() => {
  switch (props.sort) {
    case 'sdesc':
      return getSortRateNum.value;
    case 'pase':
      return getSortPriceTo.value;
    default:
      return getSortRate.value;
  }
});
const getProductList = computed(() =>
  filterProduct(getSortProduct.value, getCityName.value, categoryMap.get(route.params.category), 0)
);

const openModal = () => {
  showed.value = true;
};

const updateParams = (city) => {
  router.push({ name: 'Products', params: { cityName: city } });
};
</script>

<template>
  <div class="bg-cc-other-7/80 pt-6">
    <Container>
      <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
      <h1 class="text-3xl font-bold">{{ `${getCityName} 所有活動` }}</h1>
      <SwiperCategory :curr-category="route.params.category" :categorys="getCategorys" />
    </Container>
  </div>

  <Container>
    <div class="flex py-6">
      <div class="mr-6 w-64">
        <div
          class="relative mb-5 h-32 w-full cursor-pointer rounded-m border border-cc-other-5 bg-no-repeat object-cover object-center transition-all duration-300 hover:brightness-[.8]"
          style="
            background-image: linear-gradient(90deg, #fff7eb, rgba(255, 247, 234, 0.2)),
              url(/images/map.jpg);
          "
          @click="openModal"
        >
          <div class="absolute bottom-4 left-4 rounded-m font-bold">
            <h6 class="mb-2">看地圖搜尋{{ getCityName }}活動</h6>
            <p class="text-sm-content flex items-center justify-start gap-1">
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
        <Menu :curr-en-city="route.params.cityName" @update-city="updateParams" />
      </div>
      <div class="flex flex-1 flex-col">
        <Filter :sort="sort" :product-total="getProductList.length" />
        <div class="grid grid-cols-4 gap-x-5 gap-y-8 py-8">
          <ProductCard
            v-for="product in getProductList"
            :key="product.id"
            v-bind="product"
            notRanking
          />
        </div>
      </div>
    </div>
  </Container>

  <Modal no-scroll screen :showModal="showed" @closing="showed = false">
    <template v-slot:content>
      <ProductMap />
    </template>
  </Modal>
</template>

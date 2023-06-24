<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import Container from '@/Layout/Container.vue';
import Banner from '@/components/Banner.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SwiperProduct from '@/components/Swiper/SwiperProduct.vue';
import SwiperCity from '@/components/Swiper/SwiperCity.vue';

import useProductStore from '@/stores/product';

import { cityMap } from '@/utlis/context';
import { filterProduct } from '@/utlis/global';

// import KnowCity from './KnowCity.vue';

const route = useRoute();

const product = useProductStore();

const { getSortNew, getSortRate, getSortRec, getSortFeat } = storeToRefs(product);

const getBackgroundUrl = computed(() => `/images/background/bg_${route.params.cityName}.jpg`);
const getCityName = computed(() => cityMap.get(route.params.cityName));

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home'
  },
  {
    title: getCityName.value
  }
]);
</script>

<template>
  <Banner multiply :bg-url="getBackgroundUrl">
    <template v-slot:title>
      {{ getCityName }}
    </template>
    <template v-slot:sec-title> {{ `${getCityName} 熱門旅遊景點` }} </template>
  </Banner>
  <Container>
    <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
  </Container>
  <SwiperProduct title="Top 10 商品" :products="filterProduct(getSortRate, getCityName)" />
  <SwiperProduct
    :title="`精選${getCityName}活動`"
    :products="filterProduct(getSortFeat, getCityName)"
  />
  <SwiperProduct title="為您推薦" :products="filterProduct(getSortRec, getCityName)" />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getCityName}所有活動` }"
    :products="filterProduct(getSortNew, getCityName)"
  />
  <!-- <KnowCity :city-name="getName" :products="getProducts" /> -->
  <SwiperCity title="探索其他城市" :curr-city="getCityName" />
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Container from '@/Layout/Container.vue';
import Banner from '@/components/Banner.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SwiperProduct from '@/components/swiper/SwiperProduct.vue';
import SwiperCity from '@/components/swiper/SwiperCity.vue';

import { cityMap, mockProducts } from '@/utlis/context';
import KnowCity from './KnowCity.vue';

const route = useRoute();
const { cityName } = route.params;

const getBackgroundUrl = computed(() => `/images/background/bg_${route.params.cityName}.jpg`);
const getName = computed(() => cityMap.get(route.params.cityName));
const getProducts = computed(() =>
  mockProducts.filter((product) => product.location === getName.value)
);

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home'
  },
  {
    title: getName.value
  }
]);
</script>

<template>
  <Banner multiply :bg-url="getBackgroundUrl">
    <template v-slot:title>
      {{ getName }}
    </template>
    <template v-slot:sec-title> {{ `${getName} 熱門旅遊景點` }} </template>
  </Banner>
  <Container>
    <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
  </Container>
  <SwiperProduct title="Top 10 商品" :products="getProducts" />
  <SwiperProduct :title="`精選${getName}活動`" :products="getProducts" />
  <SwiperProduct title="為您推薦" :products="getProducts" />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getName}所有活動` }"
    :products="getProducts"
  />
  <KnowCity :city-name="getName" :products="getProducts" />
  <SwiperCity title="探索其他城市" :cur-city="getName" :cur-en-city="cityName" />
</template>

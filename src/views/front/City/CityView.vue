<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Container from '@/Layout/Container.vue';
import Banner from '@/components/Banner.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SwiperTop10Product from '@/components/swiper/SwiperTop10Product.vue';

import { cityMap, mockProducts } from '@/utlis/context';
import KnowCity from './KnowCity.vue';

const route = useRoute();
const { cityName } = route.params;

const getBackgroundUrl = computed(() => `/images/background/${cityName}.jpg`);
const getName = computed(() => cityMap.get(cityName));
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
  <Banner :bg-url="getBackgroundUrl">
    <template v-slot:title>
      {{ getName }}
    </template>
    <template v-slot:sec-title> {{ `${getName}自由行熱門旅遊景點` }} </template>
  </Banner>
  <Container>
    <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
  </Container>
  <div class="mt-12 mb-6"><SwiperTop10Product :top10="getProducts" /></div>
  <KnowCity :city-name="getName" :products="getProducts" />
</template>

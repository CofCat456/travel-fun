<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import Container from '@/Layout/Container.vue';
import Banner from '@/components/Banner.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SwiperProduct from '@/components/Swiper/SwiperProduct.vue';
import SwiperCity from '@/components/Swiper/SwiperCity.vue';

import useProductStore from '@/stores/product';

import { cityMap } from '@/utlis/context';

import KnowCity from './components/KnowCity.vue';

const route = useRoute();
const router = useRouter();

const productStore = useProductStore();

const { getByAllNewest, getByAllPopular, getByAllRecommended, getByAllPreferred } =
  storeToRefs(productStore);

const getBackgroundUrl = computed(() => `/images/background/city/bg_${route.params.cityName}.jpg`);
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

const goProducts = () => router.push({ name: 'CityProducts' });
</script>

<template>
  <Banner multiply :bg-url="getBackgroundUrl">
    <template v-slot:title>
      {{ getCityName }}
    </template>
    <template v-slot:sec-title> {{ `${getCityName} 熱門旅遊景點` }} </template>
  </Banner>
  <Container>
    <div class="mb-6">
      <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
    </div>
  </Container>
  <SwiperProduct
    title="Top 10 商品"
    :products="productStore.getFilterData(getByAllPopular, getCityName)"
  />
  <SwiperProduct
    :title="`精選${getCityName}活動`"
    :products="productStore.getFilterData(getByAllPreferred, getCityName)"
  />
  <SwiperProduct
    title="為您推薦"
    :products="productStore.getFilterData(getByAllRecommended, getCityName)"
  />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getCityName}所有活動` }"
    :products="productStore.getFilterData(getByAllNewest, getCityName)"
    @btn-click="goProducts"
  />
  <KnowCity :city-name="getCityName" />
  <SwiperCity title="探索其他城市" :curr-city="getCityName" />
</template>

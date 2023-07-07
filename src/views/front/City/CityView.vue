<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Banner from '@/components/Banner.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SwiperCity from '@/components/Swiper/SwiperCity.vue';
import SwiperProduct from '@/components/Swiper/SwiperProduct.vue';
import Container from '@/Layout/Container.vue';
import { useProductStore } from '@/stores';
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
    title: '台灣',
    pathName: 'Country',
    params: { countryName: 'taiwan' }
  },
  {
    title: getCityName.value
  }
]);

const goProducts = () => router.push({ name: 'CityProducts' });
</script>

<template>
  <Banner multiply :bg-url="getBackgroundUrl">
    <template #title>
      {{ getCityName }}
    </template>
    <template #sec-title> {{ `${getCityName} 熱門旅遊景點` }} </template>
  </Banner>
  <Container>
    <div class="mb-6">
      <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
    </div>
  </Container>
  <SwiperProduct
    title="Top 10 商品"
    :products="productStore.getFilterData(getByAllPopular, route.params.cityName)"
  />
  <SwiperProduct
    :title="`精選${getCityName}活動`"
    :products="productStore.getFilterData(getByAllPreferred, route.params.cityName)"
  />
  <SwiperProduct
    title="為您推薦"
    :products="productStore.getFilterData(getByAllRecommended, route.params.cityName)"
  />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getCityName}所有活動` }"
    :products="productStore.getFilterData(getByAllNewest, route.params.cityName)"
    @btn-click="goProducts"
  />
  <KnowCity :city-name="getCityName" />
  <SwiperCity title="探索其他城市" :curr-city="getCityName" />
</template>

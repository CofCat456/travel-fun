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
import { countryMap } from '@/utlis/context';

import KnowCountry from './components/KnowCountry.vue';

const route = useRoute();
const router = useRouter();

const productStore = useProductStore();

const { getByAllNewest, getByAllPopular, getByAllRecommended, getByAllPreferred } =
  storeToRefs(productStore);

const getBackgroundUrl = computed(
  () => `/images/background/country/bg_${route.params.countryName}.jpg`
);
const getCountryName = computed(() => countryMap.get(route.params.countryName));

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home'
  },
  {
    title: getCountryName.value
  }
]);

const goProducts = () => router.push({ name: 'CountryProducts' });
</script>

<template>
  <Banner multiply :bg-url="getBackgroundUrl">
    <template #title>
      {{ getCountryName }}
    </template>
    <template #sec-title> {{ `${getCountryName} 熱門旅遊景點` }} </template>
  </Banner>
  <Container>
    <div class="mb-6">
      <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
    </div>
  </Container>
  <SwiperProduct title="Top 10 商品" :products="productStore.getFilterData(getByAllPopular)" />
  <SwiperProduct
    :title="`精選${getCountryName}活動`"
    :products="productStore.getFilterData(getByAllPreferred)"
  />
  <SwiperProduct title="為您推薦" :products="productStore.getFilterData(getByAllRecommended)" />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getCountryName}所有活動` }"
    :products="productStore.getFilterData(getByAllNewest)"
    @btn-click="goProducts"
  />
  <KnowCountry :city-name="getCountryName" />
  <SwiperCity :title="`${getCountryName}熱門城市`" />
</template>

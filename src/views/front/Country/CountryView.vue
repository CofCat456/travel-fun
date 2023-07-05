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

import { countryMap } from '@/utlis/context';

import KnowCity from './components/KnowCity.vue';

const route = useRoute();
const router = useRouter();

const productStore = useProductStore();

const { getByNewest, getByPopular, getByRecommended, getByPreferred } = storeToRefs(productStore);

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
    <template v-slot:title>
      {{ getCountryName }}
    </template>
    <template v-slot:sec-title> {{ `${getCountryName} 熱門旅遊景點` }} </template>
  </Banner>
  <Container>
    <div class="mb-6">
      <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
    </div>
  </Container>
  <SwiperProduct title="Top 10 商品" :products="productStore.getFilterData(getByPopular)" />
  <SwiperProduct
    :title="`精選${getCountryName}活動`"
    :products="productStore.getFilterData(getByPreferred)"
  />
  <SwiperProduct title="為您推薦" :products="productStore.getFilterData(getByRecommended)" />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getCountryName}所有活動` }"
    :products="productStore.getFilterData(getByNewest)"
    @btn-click="goProducts"
  />
  <KnowCity :city-name="getCountryName" />
  <SwiperCity :title="`${getCountryName}熱門城市`" />
</template>

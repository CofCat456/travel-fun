<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Banner from '@/components/Banner.vue';
import Know from '@/components/Know.vue';
import { SwiperCity, SwiperProduct } from '@/components/Swiper';
import Container from '@/layout/Container.vue';
import { useDeviceStore, useProductStore } from '@/stores';
import { cityMap } from '@/utils/context';

const route = useRoute();
const router = useRouter();

const deviceStore = useDeviceStore();
const productStore = useProductStore();

const { isMobile } = storeToRefs(deviceStore);
const { productList, getByNewest, getByPopular, getByRecommended, getByPreferred }
  = storeToRefs(productStore);

const { getFilterData } = productStore;

const getBackgroundUrl = computed(() => `/images/background/city/bg_${route.params.cityName}.jpg`);
const getCityName = computed(() => cityMap.get(route.params.cityName));

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home',
  },
  {
    title: '台灣',
    pathName: 'Country',
    params: { countryName: 'taiwan' },
  },
  {
    title: getCityName.value,
  },
]);

const goProducts = () => router.push({ name: 'CityProducts' });
</script>

<template>
  <Banner multiply :bg-url="getBackgroundUrl">
    <template #title>
      {{ getCityName }}
    </template>
    <template #sec-title>
      {{ `${getCityName} 熱門旅遊景點` }}
    </template>
  </Banner>
  <Container>
    <div class="mb-6">
      <NBreadcrumb separator=">">
        <template v-for="{ title, pathName, params } in getBreadcrumbs" :key="title">
          <NBreadcrumbItem v-if="pathName">
            <RouterLink :to="{ name: pathName, params }">
              {{ title }}
            </RouterLink>
          </NBreadcrumbItem>
          <NBreadcrumbItem v-else>
            {{ title }}
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
    </div>
  </Container>
  <SwiperProduct
    title="Top 10 商品"
    :products="getFilterData(getByPopular, route.params.cityName as string)"
  />
  <SwiperProduct
    :title="`精選${getCityName}活動`"
    :products="getFilterData(getByPreferred, route.params.cityName as string)"
  />
  <SwiperProduct
    title="為您推薦"
    :products="getFilterData(getByRecommended, route.params.cityName as string)"
  />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getCityName}所有活動` }"
    :products="getFilterData(getByNewest, route.params.cityName as string)"
    @btn-click="goProducts"
  />
  <Know :is-mobile="isMobile" :name="getCityName" :products="getFilterData(productList, route.params.cityName as string)" />
  <SwiperCity title="探索其他城市" :curr-city="getCityName" />
</template>

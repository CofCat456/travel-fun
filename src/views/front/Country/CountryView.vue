<script setup>
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Banner from '@/components/Banner.vue';
import Know from '@/components/Know.vue';
import { SwiperCity, SwiperProduct } from '@/components/Swiper';
import Container from '@/layout/Container.vue';
import { useProductStore } from '@/stores';
import { countryMap } from '@/utlis/context';

const route = useRoute();
const router = useRouter();

const productStore = useProductStore();

const { productList, getByAllNewest, getByAllPopular, getByAllRecommended, getByAllPreferred }
  = storeToRefs(productStore);

const { getFilterData } = productStore;

const getBackgroundUrl = computed(
  () => `/images/background/country/bg_${route.params.countryName}.jpg`,
);
const getCountryName = computed(() => countryMap.get(route.params.countryName));

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home',
  },
  {
    title: getCountryName.value,
  },
]);

const goProducts = () => router.push({ name: 'CountryProducts' });
</script>

<template>
  <Banner multiply :bg-url="getBackgroundUrl">
    <template #title>
      {{ getCountryName }}
    </template>
    <template #sec-title>
      {{ `${getCountryName} 熱門旅遊景點` }}
    </template>
  </Banner>
  <Container>
    <div class="mb-6">
      <NBreadcrumb separator=">">
        <template v-for="{ title, pathName, params = null } in getBreadcrumbs" :key="title">
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
  <SwiperProduct title="Top 10 商品" :products="getFilterData(getByAllPopular)" />
  <SwiperProduct
    :title="`精選${getCountryName}活動`"
    :products="getFilterData(getByAllPreferred)"
  />
  <SwiperProduct title="為您推薦" :products="getFilterData(getByAllRecommended)" />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getCountryName}所有活動` }"
    :products="getFilterData(getByAllNewest)"
    @btn-click="goProducts"
  />
  <Know :name="getCountryName" :products="getFilterData(productList)" />
  <SwiperCity
    :title="`${getCountryName}熱門城市`"
    :slides-per-view="6"
    :slides-per-group="6"
    :space-between="16"
  />
</template>

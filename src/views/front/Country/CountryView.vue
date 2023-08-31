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
import { countryMap } from '@/utils/context';

const route = useRoute();
const router = useRouter();

const deviceStore = useDeviceStore();
const productStore = useProductStore();

const { isMobile } = storeToRefs(deviceStore);
const { productList, getByNewest, getByPopular, getByRecommended, getByPreferred }
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
        <template v-for="{ title, pathName } in getBreadcrumbs" :key="title">
          <NBreadcrumbItem v-if="pathName">
            <RouterLink :to="{ name: pathName }">
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
  <SwiperProduct title="Top 10 商品" :products="getFilterData(getByPopular)" />
  <SwiperProduct
    :title="`精選${getCountryName}活動`"
    :products="getFilterData(getByPreferred)"
  />
  <SwiperProduct title="為您推薦" :products="getFilterData(getByRecommended)" />
  <SwiperProduct
    title="最新上架"
    :btn="{ text: `查看所有${getCountryName}所有活動` }"
    :products="getFilterData(getByNewest)"
    @btn-click="goProducts"
  />
  <Know :is-mobile="isMobile" :name="getCountryName" :products="getFilterData(productList)" />
  <SwiperCity :title="`${getCountryName}熱門城市`" />
</template>

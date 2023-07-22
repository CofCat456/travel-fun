<script setup>
import { AirplanemodeActiveOutlined } from '@vicons/material';
import { NBreadcrumb, NBreadcrumbItem, NCard, NIcon, NMenu } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

import ProductCard from '@/components/Card/ProductCard.vue';
import Loading from '@/components/Loading.vue';
import { ProductMap } from '@/components/Map';
import SwiperCategory from '@/components/Swiper/SwiperCategory.vue';
import Container from '@/layout/Container.vue';
import { useDeviceStore } from '@/stores';
import useProductStore from '@/stores/product';
import { categoryMap, cityMap, countryMap, sortMap } from '@/utlis/context';
import { createRouterOption } from '@/utlis/global';

import Filter from './components/Filter.vue';
import MobileFilter from './components/MobileFilter.vue';

const props = defineProps({
  mode: {
    type: String,
    defautl: 'city'
  },
  sort: {
    type: String,
    default: ''
  }
});

const route = useRoute();
const router = useRouter();

const productStore = useProductStore();
const deviceStore = useDeviceStore();

const { isMobile } = storeToRefs(deviceStore);

const loadingRef = ref(null);
const productMap = ref(null);

const isCity = computed(() => props.mode === 'city');
const getParams = computed(() => (isCity.value ? route.params.cityName : route.params.countryName));
const getCityName = computed(() => cityMap.get(route.params.cityName));
const getCountryName = computed(() => countryMap.get(route.params.countryName));
const getCategory = computed(() => categoryMap.get(route.params.category) ?? '所有活動');
const getCategorys = computed(() => ['', ...categoryMap.keys()]);

const getFilterList = computed(() =>
  Array.from(sortMap, ([key, value]) => ({ label: value, value: key }))
);
const getEnCitys = computed(() =>
  Array.from(cityMap, ([key, value]) => ({ label: `${value}市`, key }))
);

const getEnCountrys = computed(() =>
  Array.from(countryMap, ([key, value]) => ({ label: value, key }))
);

const getBreadcrumbs = computed(() => {
  return isCity.value
    ? [
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
          title: getCityName.value,
          pathName: 'City',
          params: { cityName: route.params.cityName }
        },
        {
          title: getCategory.value
        }
      ]
    : [
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
          title: getCategory.value
        }
      ];
});

const getProductList = computed(() =>
  productStore.getFilterData(
    productStore.getSortData(props.sort || 'popular'),
    isCity.value ? route.params.cityName : '',
    0
  )
);

const updateCity = (city) => {
  const routerOption = createRouterOption(city, route.params.category, props.sort);

  return router.push({
    name: isCity.value ? 'CityProducts' : 'CountryProducts',
    ...routerOption
  });
};

const updateCategory = (category) => {
  const routerOption = createRouterOption(route.params.cityName, category, props.sort);

  router.push({
    name: isCity.value ? 'CityProducts' : 'CountryProducts',
    ...routerOption
  });
};

const updateSort = (sort) => {
  const routerOption = createRouterOption(route.params.cityName, route.params.category, sort);

  return router.push({
    name: isCity.value ? 'CityProducts' : 'CountryProducts',
    ...routerOption
  });
};

onBeforeRouteUpdate(async (to) => {
  const { category } = to.params;
  await productStore.getProducts(loadingRef, categoryMap.get(category));
});

onMounted(() => productStore.getProducts(loadingRef));
</script>

<template>
  <div class="bg-cc-other-7/80 py-2 md:py-6">
    <Container>
      <n-breadcrumb separator=">">
        <template v-for="{ title, pathName, params = null } in getBreadcrumbs" :key="title">
          <n-breadcrumb-item v-if="pathName">
            <RouterLink :to="{ name: pathName, params }">{{ title }}</RouterLink>
          </n-breadcrumb-item>
          <n-breadcrumb-item v-else> {{ title }}</n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </Container>
  </div>
  <div
    class="sticky top-16 z-20 min-h-[48px] bg-cc-other-1 shadow-[inset_0_-1px_0_0_#eaeaea] md:static md:bg-cc-other-7/80 md:shadow-none"
  >
    <Container full no-padding>
      <div class="md:bg-cc-other-7/80">
        <h1 class="hidden text-3xl font-bold md:block">
          {{ `${isCity ? getCityName : getCountryName} ${getCategory}` }}
        </h1>
        <SwiperCategory
          :curr-category="route.params.category"
          :categorys="getCategorys"
          @update-category="updateCategory"
        />
      </div>
    </Container>
  </div>
  <MobileFilter
    v-if="isMobile"
    :isCity="isCity"
    :curr-en-target="getParams"
    :array="isCity ? getEnCitys : getEnCountrys"
    :curr-sort="sort"
    :sort-array="getFilterList"
    @update-params="updateCity"
    @update-sort="updateSort"
    @open-map="openMap"
  />
  <Container>
    <div class="flex py-6">
      <div v-if="!isMobile" class="mr-6 block w-64">
        <div
          class="relative mb-5 h-32 w-full cursor-pointer rounded-m border border-cc-other-5 bg-no-repeat object-cover object-center transition-all duration-300 hover:brightness-[.8]"
          style="
            background-image: linear-gradient(90deg, #fff7eb, rgba(255, 247, 234, 0.2)),
              url(/images/map.jpg);
          "
          @click="productMap.openMap"
        >
          <div class="absolute bottom-4 left-4 rounded-m font-bold">
            <h6 class="mb-2 font-medium">
              看地圖搜尋{{ isCity ? getCityName : getCountryName }}活動
            </h6>
            <p class="text-sm-content flex items-center justify-start gap-1">
              點擊前往
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </p>
          </div>
        </div>
        <n-card size="small">
          <template #header>
            <div class="flex items-center gap-3">
              <n-icon size="24"> <AirplanemodeActiveOutlined /> </n-icon>
              目的地
            </div>
          </template>
          <n-menu
            :default-value="isCity ? route.params.cityName : route.params.countryName"
            :root-indent="25"
            :options="isCity ? getEnCitys : getEnCountrys"
            @update-value="updateCity"
          />
        </n-card>
      </div>
      <main class="flex flex-1 flex-col">
        <h6 v-if="isMobile" class="mb-4 font-medium">
          {{ isCity ? getCityName : getCountryName }} {{ getCategory }}
          {{ `(${getProductList.length})` }}
        </h6>
        <Filter
          v-else
          :curr-sort="sort"
          :product-total="getProductList.length"
          :sort-array="getFilterList"
          @update-sort="updateSort"
        />
        <div class="relative grid gap-x-5 gap-y-8 md:grid-cols-2 md:py-8 lg:grid-cols-4">
          <ProductCard
            v-for="product in getProductList"
            :key="product.id"
            v-bind="product"
            notRanking
          />
          <Loading ref="loadingRef" loader="spinner" :width="30" :height="30" :full-page="false" />
        </div>
      </main>
    </div>
  </Container>
  <ProductMap ref="productMap" :products="getProductList" />
</template>

<style scoped>
:deep(.swiper-category-custom-prev) {
  @apply -left-5;
}

:deep(.swiper-category-custom-next) {
  @apply -right-5;
}
</style>

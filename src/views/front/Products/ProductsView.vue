<script setup>
import { ref, computed, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import Container from '@/Layout/Container.vue';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Modal from '@/components/Modal/Modal.vue';
import ProductMap from '@/components/ProductMap.vue';
import ProductCard from '@/components/Card/ProductCard.vue';
import SwiperCategory from '@/components/Swiper/SwiperCategory.vue';
import Loading from '@/components/Loading.vue';

import useProductStore from '@/stores/product';
import useDebiveStore from '@/stores/device';

import { countryMap, cityMap, categoryMap, sortMap } from '@/utlis/context';

import Menu from './components/Menu.vue';
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
const deviceStore = useDebiveStore();

const { isMobile } = storeToRefs(deviceStore);

const loadingRef = ref(null);
const mapRef = ref(null);
const mobileMapRef = ref(null);

const isCity = computed(() => props.mode === 'city');
const getParams = computed(() => (isCity.value ? route.params.cityName : route.params.countryName));
const getCityName = computed(() => cityMap.get(route.params.cityName));
const getCountryName = computed(() => countryMap.get(route.params.countryName));
const getCategory = computed(() => categoryMap.get(route.params.category) ?? '所有活動');
const getCategorys = computed(() => ['', ...categoryMap.keys()]);
const getFilterList = computed(() => [...sortMap.keys()]);
const getEnCitys = computed(() => [...cityMap.keys()]);
const getEnCountrys = computed(() => [...countryMap.keys()]);
const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home'
  },
  {
    title: isCity.value ? getCityName.value : getCountryName.value,
    pathName: isCity.value ? 'City' : 'Country',
    params: isCity.value
      ? { cityName: route.params.cityName }
      : { countryName: route.params.countryName }
  },
  {
    title: getCategory.value
  }
]);

const getProductList = computed(() =>
  productStore.getFilterData(
    productStore.getSortData(props.sort || 'popular'),
    isCity.value ? getCityName.value : '',
    0
  )
);

const updateParams = (params) => {
  if (isCity.value)
    return router.push({
      name: 'CityProducts',
      params: { cityName: params, category: route.params.category },
      query: { sort: props.sort }
    });

  return router.push({
    name: 'CountryProducts',
    params: { countryName: params, category: route.params.category },
    query: { sort: props.sort }
  });
};

const updateCategory = (category) => {
  router.push({
    name: isCity.value ? 'CityProducts' : 'CountryProducts',
    params: { category },
    query: { sort: props.sort }
  });
};

const updateSort = (query) => {
  if (query) {
    if (isCity.value) {
      return router.push({
        name: 'CityProducts',
        params: { category: route.params.category },
        query: { sort: query }
      });
    }

    return router.push({
      name: 'CountryProducts',
      params: { category: route.params.category },
      query: { sort: query }
    });
  }

  if (isCity.value)
    return router.push({ name: 'CityProducts', params: { category: route.params.category } });

  return router.push({ name: 'CountryProducts', params: { category: route.params.category } });
};

onMounted(() => productStore.getProducts(loadingRef));

onBeforeRouteUpdate(async (to) => {
  const { category } = to.params;
  await productStore.getProducts(loadingRef, categoryMap.get(category));
});
</script>

<template>
  <div class="bg-cc-other-7/80 py-2 md:py-6">
    <Container>
      <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
    </Container>
  </div>
  <div
    class="sticky top-16 z-20 min-h-[48px] bg-cc-other-1 shadow-[inset_0_-1px_0_0_#eaeaea] md:static md:bg-cc-other-7/80 md:shadow-none"
  >
    <Container full no-padding>
      <div class="md:bg-cc-other-7/80">
        <h1 class="hidden text-3xl font-bold md:block">
          {{ `${isCity ? getCityName : getCountryName} 所有活動` }}
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
    @update-params="updateParams"
    @update-sort="updateSort"
    @open-map="mobileMapRef?.show"
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
          @click="mapRef?.show"
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
        <Menu
          :is-city="isCity"
          :curr-en-target="getParams"
          :array="isCity ? getEnCitys : getEnCountrys"
          @update-params="updateParams"
        />
      </div>
      <main class="flex flex-1 flex-col">
        <h6 v-if="isMobile" class="mb-4 font-medium">
          {{ getCityName }} {{ getCategory }} {{ `(${getProductList.length})` }}
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
  <Modal v-if="isMobile" id="mobileMap" ref="mobileMapRef" no-scroll screen="screen">
    <template v-slot:content>
      <button
        type="button"
        class="fixed top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cc-other-1 shadow-2xl"
        @click="mobileMapRef?.hide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <ProductMap />
    </template>
  </Modal>
  <Modal v-else id="map" ref="mapRef" no-scroll screen="screen">
    <template v-slot:content>
      <ProductMap />
    </template>
  </Modal>
</template>

<style scoped>
#map :deep(.modal-diglog) {
  @apply p-3;
}

#map :deep(.modal-window),
#mobile :deep(.modal-window) {
  @apply rounded-m;
}
</style>

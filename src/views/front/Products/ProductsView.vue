<script setup lang="ts">
import { AirplanemodeActiveOutlined } from '@vicons/material';
import { NBreadcrumb, NBreadcrumbItem, NCard, NIcon, NMenu } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Filter from './components/Filter.vue';
import MobileFilter from './components/MobileFilter.vue';
import { ProductCard } from '@/components/Card';
import { ProductMap } from '@/components/Map';
import { SwiperCategory } from '@/components/Swiper';
import Container from '@/layout/Container.vue';
import { useDeviceStore, useProductStore } from '@/stores';
import { categoryMap, cityMap, countryMap, sortMap } from '@/utils/context';
import { createRouterOption } from '@/utils/global';
import { Sort } from '@/types';

const { mode, sort = Sort.Popular } = defineProps<{
  mode: string
  sort?: Sort
}>();

const route = useRoute();
const router = useRouter();

const productStore = useProductStore();
const deviceStore = useDeviceStore();

const { isMobile } = storeToRefs(deviceStore);

const { getFilterData, getSortData, getProducts } = productStore;

const productMap = ref<InstanceType<typeof ProductMap>>();

// TODO: need to refactor
const cityName = computed(() => route.params.cityName as string);
const countryName = computed(() => route.params.countryName as string);
const category = computed(() => route.params.category as string) || Sort.Popular;
const isCity = computed(() => mode === 'city');
const getParams = computed(() => (isCity.value ? cityName.value : countryName.value));
const getCityName = computed(() => cityMap.get(cityName.value));
const getCountryName = computed<string>(() => countryMap.get(countryName.value));
const getCategory = computed<string>(() => categoryMap.get(category.value) ?? '所有活動');
const getCategorys = computed<string[]>(() => ['', ...categoryMap.keys()]);

const getFilterList = computed<Record<string, Sort>[]>(() =>
  Array.from(sortMap, ([key, value]) => ({ label: value, value: key })) as any,
);

const getEnCitys = computed<Record<string, string>[]>(() =>
  Array.from(cityMap, ([key, value]) => ({ label: `${value}市`, key })),
);

const getEnCountrys = computed<Record<string, string>[]>(() =>
  Array.from(countryMap, ([key, value]) => ({ label: value, key })),
);

const getBreadcrumbs = computed(() => {
  return isCity.value
    ? [
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
          pathName: 'City',
          params: { cityName: cityName.value },
        },
        {
          title: getCategory.value,
        },
      ]
    : [
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
          title: getCategory.value,
        },
      ];
});

const getProductList = computed(() =>
  getFilterData(
    getSortData(sort),
    isCity.value ? cityName.value : '',
    category.value,
    0,
  ),
);

function updateCity(city: string) {
  const routerOption = createRouterOption(city, category.value, sort, isCity.value);

  return router.push({
    name: isCity.value ? 'CityProducts' : 'CountryProducts',
    ...routerOption,
  });
}

function updateCategory(category: string) {
  const routerOption = createRouterOption(cityName.value, category, sort, isCity.value);

  router.push({
    name: isCity.value ? 'CityProducts' : 'CountryProducts',
    ...routerOption,
  });
}

function updateSort(item: Sort) {
  const routerOption = createRouterOption(cityName.value, category.value, item, isCity.value);

  return router.push({
    name: isCity.value ? 'CityProducts' : 'CountryProducts',
    ...routerOption,
  });
}

onMounted(() => getProducts());
</script>

<template>
  <div class="bg-cc-other-7/80 py-2 md:py-6">
    <Container>
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
          :curr-category="category"
          :categorys="getCategorys"
          @update-category="updateCategory"
        />
      </div>
    </Container>
  </div>
  <MobileFilter
    v-if="isMobile"
    :is-city="isCity"
    :curr-en-target="getParams"
    :array="isCity ? getEnCitys : getEnCountrys"
    :curr-sort="sort"
    :sort-array="getFilterList"
    @update:params="updateCity"
    @update:sort="updateSort"
    @open-map="productMap?.openMap"
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
          @click="productMap?.openMap"
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
        <NCard size="small">
          <template #header>
            <div class="flex items-center gap-3">
              <NIcon size="24">
                <AirplanemodeActiveOutlined />
              </NIcon>
              目的地
            </div>
          </template>
          <NMenu
            :default-value="isCity ? cityName : countryName"
            :root-indent="25"
            :options="isCity ? getEnCitys : getEnCountrys"
            @update-value="updateCity"
          />
        </NCard>
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
          @update:sort="updateSort"
        />
        <div class="relative grid gap-x-5 gap-y-8 md:grid-cols-2 md:py-8 lg:grid-cols-4">
          <ProductCard
            v-for="product in getProductList"
            :key="product.id"
            v-bind="product"
            not-ranking
          />
        </div>
      </main>
    </div>
  </Container>
  <ProductMap ref="productMap" :is-mobile="isMobile" :products="getProductList" />
</template>

<style scoped>
:deep(.swiper-category-custom-prev) {
  @apply -left-5;
}

:deep(.swiper-category-custom-next) {
  @apply -right-5;
}
</style>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NSpace, useLoadingBar } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { Embed } from '@voomap/map';

import Content from './components/Content.vue';
import LeftSidebar from './components/LeftSidebar.vue';
import RightSidebar from './components/RightSidebar.vue';
import TopWrapper from './components/TopWrapper.vue';
import Plans from './components/Plans.vue';
import Plan from './components/Plan.vue';
import { cityMap } from '@/utils/context';
import { useCartStore, useDeviceStore, useProductStore } from '@/stores';
import Container from '@/layout/Container.vue';
import Title from '@/components/Title.vue';
import { SwiperBanner, SwiperProduct } from '@/components/Swiper';
import type { Product } from '@/types';

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const loadingBar = useLoadingBar();

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const deviceStore = useDeviceStore();
const productStore = useProductStore();

const { isLoading } = storeToRefs(cartStore);
const { isMobile } = storeToRefs(deviceStore);
const { getByRecommended } = storeToRefs(productStore);

const { addCart } = cartStore;
const { getProduct, getFilterData } = productStore;

const product: Product = reactive({
  id: '',
  title: '',
  city: '',
  address: '',
  category: '',
  unit: '',
  evaluate: 0,
  evaluateNum: 0,
  origin_price: 0,
  price: 0,
  date: Date.now(),
  description: '',
  is_enabled: false,
  imageUrl: '',
  imagesUrl: [],
  features: '',
  plans: [],
  content: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
});

const productId = route.params.productId as string;

const getBreadcrumbs = computed(() => [
  {
    title: 'Travel Fun',
    pathName: 'Home',
  },
  {
    title: '台灣',
    pathName: 'Country',
    params: { countryName: 'taiwan' },
  },
  {
    title: cityMap.get(product?.city),
    pathName: 'City',
    params: { cityName: product?.city },
  },
  {
    title: product?.title,
  },
]);

// 確定路由變更時但組件被複用，能重新獲取產品
onBeforeRouteUpdate(async (to) => {
  loadingBar.start();

  const { productId } = to.params as { productId: string };

  try {
    Object.assign(product, await getProduct(productId));
  }
  catch {
    loadingBar.error();
    router.back();
  }
  finally {
    loadingBar.finish();
  }
});

onMounted(async () => {
  loadingBar.start();
  await Object.assign(product, await getProduct(productId));
  loadingBar.finish();
});
</script>

<template>
  <div id="banner" />
  <template v-if="product && product.id">
    <Container class="pb-5 md:py-5">
      <NBreadcrumb class="my-2" separator=">">
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
      <h1 class="text-2xl md:text-3xl font-bold">
        {{ product.title }}
      </h1>
      <TopWrapper
        :id="product.id"
        :is-mobile="isMobile"
        :title="product.title"
        :evaluate="product.evaluate"
        :evaluate-num="product.evaluateNum"
        :address="product.address"
      />
      <teleport to="#banner" :disabled="!isMobile">
        <SwiperBanner
          loop
          centered-slides
          :slides-per-view="1.75"
          :slides-per-group="1"
          :space-between="10"
          :speed="600"
          :images-url="product.imagesUrl || []"
        />
      </teleport>
      <div class="flex flex-col md:flex-row gap-8">
        <div v-if="product.features" class="w-full md:w-8/12 order-1">
          <LeftSidebar :features="product.features" />
        </div>
        <aside :class="isMobile ? 'order-first' : 'order-2'">
          <RightSidebar
            :id="product.id"
            :is-mobile="isMobile"
            :title="product.title"
            :price="product.price"
            :origin-price="product.origin_price"
          />
        </aside>
      </div>
    </Container>
    <div v-if="product.plans && product.plans?.length !== 0" class="bg-cc-other-7/80 py-5 md:py-10">
      <Plans>
        <template
          v-for="plan in product.plans || []"
          :key="plan.content"
        >
          <Plan
            :id="product.id"
            :is-mobile="isMobile"
            :product-title="product.title"
            :date="product.date"
            :unit="product.unit"
            :title="plan.title"
            :content="plan.content"
            :price="plan.price"
            :origin-price="plan.origin_price"
            :is-loading="isLoading"
            @add-cart="addCart"
          />
        </template>
      </Plans>
    </div>
    <Container class="py-5 md:py-10">
      <NSpace class="w-full md:w-8/12 md:pr-8" vertical :size="60">
        <Content v-if="product.content" :content="product.content" />
        <div :class="isMobile ? 'w-full' : 'w-4/5'">
          <Title page title="景點地圖" />
          <Embed
            v-if="product.address"
            id="map"
            map-mode="place"
            width="100%"
            height="400px"
            :api-key="VITE_GOOGLE_MAP_API_KEY"
            :address="product.address"
          />
        </div>
      </NSpace>
    </Container>
    <div class="bg-cc-other-7/80">
      <SwiperProduct
        title="更多推薦"
        :products="getFilterData(getByRecommended, '', product.category)"
      />
    </div>
  </template>
</template>

<style scoped>
:deep(.list) > ul,
:deep(.list) > ol{
  @apply list-disc pl-6 text-base tracking-wide;
}

:deep(.list) li {
  @apply py-1;
}
</style>

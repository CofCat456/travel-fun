<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NSpace, useLoadingBar } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

import Content from './components/Content.vue';
import LeftSidebar from './components/LeftSidebar.vue';
import RightSidebar from './components/RightSidebar.vue';
import TopWrapper from './components/TopWrapper.vue';
import Plan from './components/Plan.vue';
import { cityMap } from '@/utils/context';
import { useCartStore, useProductStore } from '@/stores';
import Container from '@/layout/Container.vue';
import { SwiperBanner, SwiperProduct } from '@/components/Swiper';
import { Map } from '@/components/Map';
import type { Product } from '@/types';

const loadingBar = useLoadingBar();

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const productStore = useProductStore();

const { isLoading } = storeToRefs(cartStore);
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
  Object.assign(product, await getProduct(productId));
});
</script>

<template>
  <template v-if="product && product.id">
    <Container class="py-5">
      <div class="my-4">
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
      <h1 class="text-3xl font-bold">
        {{ product.title }}
      </h1>
      <TopWrapper
        :id="product.id"
        :title="product.title"
        :evaluate="product.evaluate"
        :evaluate-num="product.evaluateNum"
        :address="product.address"
      />
      <SwiperBanner
        loop
        centered-slides
        :slides-per-view="1.75"
        :slides-per-group="1"
        :space-between="10"
        :speed="600"
        :images-url="product.imagesUrl || []"
      />
      <div class="flex gap-8">
        <div v-if="product.features" class="w-8/12">
          <LeftSidebar :features="product.features" />
        </div>
        <div class="flex-1">
          <RightSidebar :price="product.price" :origin-price="product.origin_price" />
        </div>
      </div>
    </Container>
    <div v-if="product.plans" class="bg-cc-other-7/80 py-10 mb-10">
      <Plan
        :id="product.id"
        :unit="product.unit"
        :plans="product.plans"
        :adding="isLoading"
        @add-cart="addCart"
      />
    </div>
    <Container>
      <NSpace class="w-8/12 py-10 pr-8" vertical :size="40">
        <Content v-if="product.content" :content="product.content" />
        <Map v-if="product.coordinates" :title="product.title" :coordinates="product.coordinates" />
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
:deep(#list) > ul {
  @apply list-disc pl-6 text-base tracking-wide;
}

:deep(li) {
  @apply py-1;
}
</style>

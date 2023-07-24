<script setup>
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, inject, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

import { SwiperBanner } from '@/components/Swiper';
import Container from '@/layout/Container.vue';
import { useCartStore, useProductStore } from '@/stores';
import { cityMap } from '@/utlis/context';

import Content from './components/Content.vue';
import LeftSidebar from './components/LeftSidebar.vue';
import Plan from './components/Plan.vue';
import RightSidebar from './components/RightSidebar.vue';
import TopWrapper from './components/TopWrapper.vue';

const route = useRoute();
const router = useRouter();

const loading = inject('loading');

const cartStore = useCartStore();
const productStore = useProductStore();

const { isLoading } = storeToRefs(cartStore);
const { product } = storeToRefs(productStore);

const { addCart } = cartStore;
const { getProduct } = productStore;

const getBreadcrumbs = computed(() => [
  {
    title: 'Travel Fun',
    pathName: 'Home'
  },
  {
    title: '台灣',
    pathName: 'Country',
    params: { countryName: 'taiwan' }
  },
  {
    title: cityMap.get(product.value?.city),
    pathName: 'City',
    params: { cityName: product.value?.city }
  },
  {
    title: product.value?.title
  }
]);

// 確定路由變更時但組件被複用，能重新獲取產品
onBeforeRouteUpdate(async (to) => {
  const { productId } = to.params;

  try {
    await getProduct(loading, productId);
  } catch {
    router.go(-1);
  }
});

onMounted(() => getProduct(loading, route.params.productId));
</script>

<template>
  <template v-if="product && product.id">
    <Container class="py-5">
      <div class="my-4">
        <n-breadcrumb separator=">">
          <template v-for="{ title, pathName, params = null } in getBreadcrumbs" :key="title">
            <n-breadcrumb-item v-if="pathName">
              <RouterLink :to="{ name: pathName, params }">{{ title }}</RouterLink>
            </n-breadcrumb-item>
            <n-breadcrumb-item v-else> {{ title }}</n-breadcrumb-item>
          </template>
        </n-breadcrumb>
      </div>
      <h1 class="text-3xl font-bold">{{ product.title }}</h1>
      <TopWrapper
        :evaluate="product.evaluate"
        :evaluate-num="product.evaluateNum"
        :address="product.address"
      />
      <SwiperBanner
        loop
        centered-slides
        :slides-per-view="1.75"
        :space-between="10"
        :speed="600"
        :imagesUrl="product.imagesUrl"
      />
      <div class="flex gap-8">
        <div class="w-8/12">
          <LeftSidebar :features="product.features" />
        </div>
        <div class="w-4/12">
          <RightSidebar :price="product.price" :origin_price="product.origin_price" />
        </div>
      </div>
    </Container>
    <Plan
      :id="product.id"
      :unit="product.unit"
      :plans="product.plans"
      :adding="isLoading"
      @add-cart="addCart"
    />
    <Container class="py-5">
      <Content :content="product.content" />
    </Container>
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

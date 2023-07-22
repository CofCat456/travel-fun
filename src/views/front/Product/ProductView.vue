<script setup>
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import { computed, inject, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

import SwiperBanner from '@/components/Swiper/SwiperBanner.vue';
import Container from '@/layout/Container.vue';
import { useCartStore } from '@/stores';
import { apiUSerGetProduct } from '@/utlis/api';
import { cityMap } from '@/utlis/context';

import Content from './components/Content.vue';
import LeftSidebar from './components/LeftSidebar.vue';
import Plan from './components/Plan.vue';
import RightSidebar from './components/RightSidebar.vue';
import TopWrapper from './components/TopWrapper.vue';

const cart = useCartStore();

const route = useRoute();
const router = useRouter();

const loading = inject('loading');

const product = ref({});

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

const getProduct = async (productId) => {
  loading?.value?.show();

  try {
    const res = await apiUSerGetProduct(productId);

    const {
      data: { success, product: resProduct }
    } = res;

    if (success) {
      product.value = resProduct;
      console.log(product.value);
    }
  } catch {
    router.go(-1);
  } finally {
    loading?.value?.hide();
  }
};

// 確定路由變更時但組件被複用，能重新獲取產品
onBeforeRouteUpdate(async (to) => {
  const { productId } = to.params;

  await getProduct(productId);
});

onMounted(() => getProduct(route.params.productId));
</script>

<template>
  <Container v-if="product.id" class="py-5">
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
    <SwiperBanner :imagesUrl="product.imagesUrl" />
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
    :adding="cart.isLoading"
    @add-cart="cart.addCart"
  />
  <Container v-if="product.id" class="py-5">
    <Content :content="product.content" />
  </Container>
</template>

<style scoped>
:deep(#list) > ul {
  @apply list-disc pl-6 text-base tracking-wide;
}

:deep(li) {
  @apply py-1;
}
</style>

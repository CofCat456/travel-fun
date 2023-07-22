<script setup>
import { NConfigProvider } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, provide, ref } from 'vue';
import { RouterView } from 'vue-router';

import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import Loading from '../components/Loading.vue';
import { useCartStore, useProductStore } from '../stores';
import { apiUserGetAllProducts, apiUserGetCarts, apiUserGetProducts } from '../utlis/api';

const loadingRef = ref(null);
const isDone = ref(false);

const themeOverrides = {
  common: {
    primaryColor: '#0F4BB4',
    primaryColorHover: '#68A0E8',
    primaryColorPressed: '#072A81',
    primaryColorSuppl: '#CDE4FB',
    borderRadius: '5px',
    textColorBase: '#181818',
    textColor1: '#181818',
    textColor2: '#181818',
    textColor3: '#181818'
  },
  Breadcrumb: {
    itemTextColor: '#0F4BB4',
    itemTextColorHover: '#0F4BB4',
    itemTextColorPressed: '#EE5220',
    itemColorHover: '#CDE4FB'
  },
  Card: {
    borderColor: '#D4D4D4'
  },
  Rate: {
    itemColorActive: '#EE5220'
  }
};

provide('loading', loadingRef);

const product = useProductStore();
const cart = useCartStore();

const { allProductList, productList } = storeToRefs(product);
const { cartList } = storeToRefs(cart);

const getInitialProducts = async () => {
  loadingRef.value.show();
  isDone.value = false;

  try {
    const [getAllProductsRes, getProductRes, getCartsRes] = await Promise.all([
      apiUserGetAllProducts(),
      apiUserGetProducts(),
      apiUserGetCarts()
    ]);

    allProductList.value = getAllProductsRes?.data?.products ?? [];
    productList.value = getProductRes?.data?.products ?? [];
    cartList.value = getCartsRes?.data?.data?.carts ?? [];

    console.log(allProductList.value, productList.value, cartList.value);

    loadingRef.value.hide();
  } finally {
    isDone.value = true;
  }
};

onMounted(async () => {
  await getInitialProducts();
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <section class="flex min-h-screen flex-col">
      <Header />
      <div class="relative flex-1">
        <RouterView v-if="isDone" />
      </div>
      <Footer />
      <Loading ref="loadingRef" />
    </section>
  </n-config-provider>
</template>

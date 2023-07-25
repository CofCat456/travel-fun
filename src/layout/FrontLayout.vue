<script setup>
import { NConfigProvider } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, provide, ref } from 'vue';
import { RouterView } from 'vue-router';

import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import Loading from '../components/Loading.vue';
import { useCartStore, useProductStore } from '../stores';
import { apiUserGetAllProducts, apiUserGetCarts } from '../utlis/api';

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
    textColor3: '#181818',
  },
  Breadcrumb: {
    itemTextColor: '#0F4BB4',
    itemTextColorHover: '#0F4BB4',
    itemTextColorPressed: '#EE5220',
    itemColorHover: '#CDE4FB',
  },
  Card: {
    borderColor: '#D4D4D4',
  },
  Rate: {
    itemColorActive: '#EE5220',
  },
};

provide('loading', loadingRef);

const cartStore = useCartStore();
const productStore = useProductStore();

const { cartList } = storeToRefs(cartStore);
const { productList } = storeToRefs(productStore);

async function getInitialProducts() {
  loadingRef.value.show();
  isDone.value = false;

  try {
    const [getProductsRes, getCartsRes] = await Promise.all([
      apiUserGetAllProducts(),
      apiUserGetCarts(),
    ]);

    productList.value = getProductsRes?.data?.products ?? [];
    cartList.value = getCartsRes?.data?.data?.carts ?? [];

    console.log(productList.value, cartList.value);

    loadingRef.value.hide();
  }
  finally {
    isDone.value = true;
  }
}

onMounted(async () => {
  await getInitialProducts();
});
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <section class="flex min-h-screen flex-col">
      <Header />
      <div class="relative flex-1">
        <RouterView v-if="isDone" />
      </div>
      <Footer />
      <Loading ref="loadingRef" />
    </section>
  </NConfigProvider>
</template>

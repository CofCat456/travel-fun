<script setup>
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
  <section class="flex flex-col">
    <Header />
    <div class="flex-1">
      <RouterView v-if="isDone" />
    </div>
    <Footer />
    <Loading ref="loadingRef" />
  </section>
</template>

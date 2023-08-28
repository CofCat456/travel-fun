<script setup lang="ts">
import { useLoadingBar } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

import Footer from '../components/Footer.vue';
import Header from '../components/Header';
import { useCartStore, useProductStore } from '../stores';
import { apiUserCheckSignin, apiUserGetAllProducts, apiUserGetCarts } from '../utils/api';

const route = useRoute();
const router = useRouter();

const loadingBar = useLoadingBar();

const isDone = ref(false);

const cartStore = useCartStore();
const productStore = useProductStore();

const { cartList, total, finalTotal } = storeToRefs(cartStore);
const { productList } = storeToRefs(productStore);

const canLoadingBar = computed(() => route.name !== 'Product');

async function getInitialProducts() {
  if (canLoadingBar.value)
    loadingBar.start();

  isDone.value = false;

  try {
    const [getProductsRes, getCartsRes] = await Promise.all([
      apiUserGetAllProducts(),
      apiUserGetCarts(),
    ]);

    productList.value = getProductsRes?.data?.products ?? [];
    cartList.value = getCartsRes?.data?.data?.carts ?? [];
    total.value = getCartsRes?.data?.data?.total;
    finalTotal.value = getCartsRes?.data?.data?.final_total;
  }
  catch {
    loadingBar.error();
  }
  finally {
    loadingBar.finish();
    isDone.value = true;
  }
}

onMounted(async () => {
  await getInitialProducts();
});

router.beforeEach(async (to, _from, next) => {
  const title = to.meta?.title as string;
  const requiresAuth = to.meta?.requiresAuth;

  if (title)
    document.title = title;

  if (requiresAuth) {
    loadingBar.start();

    try {
      const res = await apiUserCheckSignin();

      const { data: { success } } = res;

      if (success)
        next();
      else
        next({ name: 'Home' });
    }
    catch {
      loadingBar.error();
      next({ name: 'Home' });
    }
    finally {
      loadingBar.finish();
    }
  }
  else {
    next();
  }
});
</script>

<template>
  <section class="flex min-h-screen flex-col">
    <Header />
    <div class="relative flex-1 flex flex-col items-stretch">
      <RouterView v-if="isDone" />
    </div>
    <Footer />
  </section>
</template>

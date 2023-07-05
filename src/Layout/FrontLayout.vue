<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';

import useProductStore from '../stores/product';

const loadingRef = ref(null);

const product = useProductStore();

onMounted(() => {
  product.getAllProducts(loadingRef);
});
</script>

<template>
  <section class="flex flex-col">
    <Header />
    <div class="flex-1">
      <RouterView v-if="product.isDone" />
    </div>
    <Footer />
    <Loading ref="loadingRef" />
  </section>
</template>

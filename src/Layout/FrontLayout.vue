<script setup>
import { RouterView } from 'vue-router';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="flex h-full flex-col">
    <Header />
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

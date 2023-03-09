<script setup>
import SwiperNews from '@/components/swiper/SwiperNews.vue';
import SwiperTop10Product from '@/components/swiper/SwiperTop10Product.vue';

import Banner from './components/Banner.vue';

import { mockNews, mockTop10, mockNewProduct } from './_Context';
import SwiperNewProduct from '../../../components/swiper/SwiperNewProduct.vue';
</script>

<template>
  <main class="flex min-h-[300vh] flex-col items-center">
    <Banner />
    <SwiperNews :news="mockNews" />
    <img
      src="/images/travel-the-world.png"
      alt="travel world fun"
      class="-z-10 mb-4 -translate-y-8"
    />
    <SwiperTop10Product :top10="mockTop10" />
    <img src="/images/home-bg.png" alt="home bg" class="mt-[50px] mb-[65px]" loading="lazy" />
    <SwiperNewProduct :new-products="mockNewProduct" />
    <button type="button" class="mt-[50px] btn">查看更多</button>
    <div class="bg-cc-other-7"></div>
  </main>
</template>

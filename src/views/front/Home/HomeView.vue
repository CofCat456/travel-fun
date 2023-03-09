<script setup>
import SwiperNews from '@/components/swiper/SwiperNews.vue';
import SwiperTop10Product from '@/components/swiper/SwiperTop10Product.vue';

import Banner from './components/Banner.vue';

import { mockNews, mockTop10 } from './_Context';
</script>

<template>
  <main class="min-h-[200vh] bg-cc-other-7">
    <Banner />
    <SwiperNews :news="mockNews" />
    <img
      src="/images/travel-the-world.png"
      alt="travel world fun"
      class="-z-10 -translate-y-8 mb-4"
    />
    <SwiperTop10Product :top10="mockTop10" />
    <img src="/images/home-bg.png" alt="home bg" class="mt-[50px] mb-[65px]" loading="lazy" />
  </main>
</template>

<script setup>
import SwiperNews from '@/components/swiper/SwiperNews.vue';
import SwiperTop10Product from '@/components/swiper/SwiperTop10Product.vue';
import SwiperNewProduct from '@/components/swiper/SwiperNewProduct.vue';

import Banner from './components/Banner.vue';
import HotCity from './components/HotCity.vue';

import { mockNews, mockTop10, mockNewProducts, mockHotCitys } from './_Context';
</script>

<template>
  <main>
    <Banner />
    <SwiperNews :news="mockNews" />
    <img
      src="/images/travel-the-world.png"
      alt="travel world fun"
      class="-z-10 mb-4 -translate-y-8"
    />
    <SwiperTop10Product :top10="mockTop10" />
    <img src="/images/home-bg.png" alt="home bg" class="mt-[50px] mb-[65px]" loading="lazy" />
    <SwiperNewProduct :new-products="mockNewProducts" />
    <div class="text-center">
      <button type="button" class="btn my-[50px]">查看更多</button>
    </div>
    <div class="bg-cc-other-7 pb-20 pt-12">
      <HotCity :hot-citys="mockHotCitys" />
    </div>
  </main>
</template>

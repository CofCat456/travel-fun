<script setup>
import SwiperNews from '@/components/swiper/SwiperNews.vue';
import SwiperTop10Product from '@/components/swiper/SwiperTop10Product.vue';
import SwiperNewProduct from '@/components/swiper/SwiperNewProduct.vue';

import Banner from './components/Banner.vue';
import HotCity from './components/HotCity.vue';
import Member from './components/Member.vue';

import { mockNews, mockTop10, mockNewProducts, mockHotCitys } from './_Context';
</script>

<template>
  <main>
    <Banner />
    <div class="mb-[48px] md:mb-0">
      <SwiperNews :news="mockNews" />
    </div>
    <img
      src="/images/travel-the-world.png"
      alt="travel world fun"
      class="-z-10 mb-4 hidden -translate-y-8 md:block"
    />
    <SwiperTop10Product :top10="mockTop10" />
    <img
      src="/images/home-bg.png"
      alt="home bg"
      class="my-[48px] md:mt-[50px] md:mb-[65px]"
      loading="lazy"
    />
    <SwiperNewProduct :new-products="mockNewProducts" />
    <div class="text-center">
      <button type="button" class="btn my-6 md:my-[50px]">查看更多</button>
    </div>
    <HotCity :hot-citys="mockHotCitys" />
    <Member />
  </main>
</template>

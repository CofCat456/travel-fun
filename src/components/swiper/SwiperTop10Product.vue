<script setup>
// import Swiper core and required modules
import { Navigation } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import Container from '@/Layout/Container.vue';

import Title from './Title.vue';
import CustomNavigation from './CustomNavigation.vue';
import ProductCard from '../card/ProductCard.vue';

const props = defineProps({
  top10: {
    type: Array,
    default: () => []
  }
});

const modules = [Navigation];
</script>

<template>
  <Container>
    <Title title="Top 10 商品" sec-title="尋找最受歡迎的商品嗎？別再猶豫，立刻挑選！" />
    <div class="relative px-4">
      <Swiper
        :modules="modules"
        :slides-per-view="6"
        :space-between="24"
        :navigation="{
          prevEl: '.swiper-top10-custom-prev',
          nextEl: '.swiper-top10-custom-next'
        }"
        loop
      >
        <SwiperSlide v-for="(item, index) in props.top10" :key="item.title">
          <ProductCard v-bind="item" :ranking="index + 1" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="top10" />
    </div>
  </Container>
</template>

<style scoped>
:deep .swiper-btn {
  top: calc(50% - (120px + 8px) / 2);
}
</style>

<script setup>
import { ref } from 'vue';

// import Swiper core and required modules
import { Navigation } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import Container from '@/Layout/Container.vue';
import SwiperLayout from '@/Layout/SwiperLayout.vue';

import Title from './Title.vue';
import CustomNavigation from './CustomNavigation.vue';
import ProductCard from '../card/ProductCard.vue';

defineProps({
  top10: {
    type: Array,
    default: () => []
  }
});

const modules = [Navigation];

const isBeginning = ref(true);
const isEnd = ref(false);

const onSwiper = (swiper) => {
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};
const onSlideChange = (swiper) => {
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};
</script>

<template>
  <Container>
    <Title title="Top 10 商品" sec-title="尋找最受歡迎的商品嗎？別再猶豫，立刻挑選！" />
    <SwiperLayout>
      <Swiper
        :modules="modules"
        :slides-per-view="6"
        :space-between="24"
        :slides-per-group="6"
        :speed="1200"
        :navigation="{
          prevEl: '.swiper-top10-custom-prev',
          nextEl: '.swiper-top10-custom-next'
        }"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            speed: 300
          },
          '@0.50': {
            slidesPerView: 3,
            spaceBetween: 24,
            slidesPerGroup: 3,
            speed: 600
          },
          '@0.75': {
            slidesPerView: 4,
            spaceBetween: 24,
            slidesPerGroup: 4,
            speed: 800
          },
          '@1.00': {
            slidesPerView: 5,
            spaceBetween: 24,
            slidesPerGroup: 5,
            speed: 1000
          },
          '@1.50': {
            slidesPerView: 6,
            spaceBetween: 24
          }
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="(item, index) in top10" :key="item.title">
          <ProductCard v-bind="item" :ranking="index + 1" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="top10" :is-beginning="isBeginning" :is-end="isEnd" />
    </SwiperLayout>
  </Container>
</template>

<style scoped>
:deep .swiper-btn {
  top: calc(50% - (120px + 8px) / 2);
}
</style>

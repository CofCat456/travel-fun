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
import NewCard from '../card/NewCard.vue';

defineProps({
  news: {
    type: Array,
    default: () => []
  }
});

const modules = [Navigation];

const isBeginning = ref(true);
const isEnd = ref(false);

const onSwiper = (swiper) => {
  console.log(swiper);
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
    <Title
      title="最新旅遊優惠"
      sec-title="旅行變得更簡單！我們提供最新的旅遊優惠，讓您輕鬆規劃完美的旅程！"
    />
    <SwiperLayout>
      <Swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="24"
        :slides-per-group="3"
        :speed="600"
        :navigation="{
          prevEl: '.swiper-news-custom-prev',
          nextEl: '.swiper-news-custom-next'
        }"
        :breakpoints="{
          '@0.00': {
            direction: 'vertical',
            slidesPerView: 3,
            spaceBetween: 24,
            slidesPerGroup: 3,
            speed: 600
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 24,
            slidesPerGroup: 2
          },
          '@1.00': {
            slidesPerView: 2,
            spaceBetween: 24,
            slidesPerGroup: 2,
            speed: 400
          },
          '@1.50': {
            slidesPerView: 3,
            spaceBetween: 24
          }
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="item in news" :key="item.title">
          <NewCard v-bind="item" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="news" :is-beginning="isBeginning" :is-end="isEnd" />
    </SwiperLayout>
  </Container>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .swiper {
    height: 768px;
  }
}
</style>

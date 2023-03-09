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
import NewCard from '../card/NewCard.vue';

defineProps({
  news: {
    type: Array,
    default: () => []
  }
});

const modules = [Navigation];
</script>

<template>
  <Container>
    <Title
      title="最新旅遊優惠"
      sec-title="旅行變得更簡單！我們提供最新的旅遊優惠，讓您輕鬆規劃完美的旅程！"
    />
    <div class="relative px-4">
      <Swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="24"
        :navigation="{
          prevEl: '.swiper-news-custom-prev',
          nextEl: '.swiper-news-custom-next'
        }"
        loop
      >
        <SwiperSlide v-for="item in news" :key="item.title">
          <NewCard v-bind="item" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="news" />
    </div>
  </Container>
</template>

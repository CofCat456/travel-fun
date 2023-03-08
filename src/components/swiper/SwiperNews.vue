<script setup>
// import Swiper core and required modules
import { Navigation } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import Title from './Title.vue';
import NewCard from '../card/NewCard.vue';
import CustomNavigation from './CustomNavigation.vue';

const props = defineProps({
  news: {
    type: Array,
    default: () => []
  }
});

const modules = [Navigation];
</script>

<template>
  <div>
    <Title />
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
        <SwiperSlide v-for="item in props.news" :key="item.title">
          <NewCard v-bind="item" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="news" />
    </div>
  </div>
</template>

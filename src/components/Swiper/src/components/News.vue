<script setup lang="ts">
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';

import type { SwiperOptions } from 'swiper/types';
import { useSwiper } from '../hooks/useSwiper';
import SwiperLayout from '../Layout.vue';
import CustomNavigation from './CustomNavigation.vue';
import Title from '@/components/Title.vue';
import { NewCard } from '@/components/Card';
import type { New } from '@/types';

const {
  slidesPerView = 3,
  slidesPerGroup = 3,
  spaceBetween = 24,
  speed = 600,
} = defineProps<SwiperOptions & {
  news: New[]
}>();

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiper();

const getBindValues = computed(() => {
  return {
    speed,
    slidesPerView,
    slidesPerGroup,
    spaceBetween,
    modules: [Navigation],
    breakpoints: {
      '@0.00': {
        direction: 'vertical' as 'horizontal' | 'vertical',
      },
      '@0.75': {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      '@1.00': {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 400,
      },
      '@1.50': {
        slidesPerView,
        spaceBetween,
      },
    },
    navigation: {
      prevEl: '.swiper-news-custom-prev',
      nextEl: '.swiper-news-custom-next',
    },
  };
});
</script>

<template>
  <SwiperLayout>
    <template #title>
      <Title
        title="最新旅遊優惠"
        sec-title="旅行變得更簡單！我們提供最新的旅遊優惠，讓您輕鬆規劃完美的旅程！"
      />
    </template>
    <template #swiper>
      <Swiper
        v-bind="getBindValues"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="item in news || []" :key="item.title">
          <NewCard v-bind="item" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="news" :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
  </SwiperLayout>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .swiper {
    height: 768px;
  }
}
</style>

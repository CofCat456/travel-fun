<script setup lang="ts">
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';

import type { SwiperOptions } from 'swiper/types';
import { useSwiper } from '../hooks/useSwiper';
import SwiperLayout from '../Layout.vue';
import CustomNavigation from './CustomNavigation.vue';

const {
  slidesPerView = 1.75,
  slidesPerGroup = 1,
  spaceBetween = 10,
  speed = 600,
  loop = true,
  centeredSlides = true,
} = defineProps<SwiperOptions & {
  imagesUrl: string[]
}>();

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiper();

const getBindValues = computed(() => ({
  modules: [Navigation, Pagination],
  breakpoints: {
    '@0.00': {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween,
      speed,
      loop,
      centeredSlides,
    },
    '@0.75': {
      slidesPerView: Number(slidesPerView),
      slidesPerGroup: Number(slidesPerGroup),
      spaceBetween,
      speed,
      loop,
      centeredSlides,
    },
  },
  navigation: {
    prevEl: '.swiper-banner-custom-prev',
    nextEl: '.swiper-banner-custom-next',
  },
}));

function pagination() {
  return {
    clickable: true,
    renderBullet: (_: number, className: string) => {
      return `<span class="${className}"></span>`;
    },
  };
}
</script>

<template>
  <SwiperLayout is-banner no-padding>
    <template #swiper>
      <Swiper
        :pagination="pagination()"
        v-bind="getBindValues"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="imageUrl in imagesUrl || []" :key="imageUrl" class="bg-sky-300">
          <img :src="imageUrl">
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="banner" is-normal :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
  </SwiperLayout>
</template>

<style scoped>
img {
  @apply aspect-video object-cover object-center;
}

:deep(.swiper-pagination-bullet) {
  @apply h-2 w-2 border border-cc-other-1 bg-cc-other-1/30 opacity-70 hover:opacity-90;
}

:deep(.swiper-pagination-bullet-active) {
  @apply scale-150 border-cc-other-1 bg-cc-other-1;
}
</style>

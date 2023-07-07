<script setup>
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';

import SwiperLayout from '@/Layout/SwiperLayout.vue';

import CustomNavigation from './internal/CustomNavigation.vue';

defineProps({
  slidesPerView: {
    type: Number,
    default: 3
  },
  spaceBetween: {
    type: Number,
    default: 24
  },
  slidesPerGroup: {
    type: Number,
    default: 1
  },
  imagesUrl: {
    type: Array,
    default: () => []
  }
});

const modules = [Navigation, Pagination];

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

const pagination = () => ({
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className}"></span>`;
  }
});
</script>

<template>
  <SwiperLayout is-normal>
    <template #swiper>
      <Swiper
        :modules="modules"
        :navigation="{
          prevEl: '.swiper-banner-custom-prev',
          nextEl: '.swiper-banner-custom-next'
        }"
        :pagination="pagination()"
        :loop="true"
        :slides-per-view="1.75"
        :space-between="10"
        :centered-slides="true"
        :speed="600"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="imageUrl in imagesUrl" :key="imageUrl" class="bg-sky-300">
          <img :src="imageUrl" />
        </SwiperSlide>
        <SwiperSlide v-for="imageUrl in imagesUrl" :key="imageUrl" class="bg-sky-300">
          <img :src="imageUrl" />
        </SwiperSlide>
        <SwiperSlide v-for="imageUrl in imagesUrl" :key="imageUrl" class="bg-sky-300">
          <img :src="imageUrl" />
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

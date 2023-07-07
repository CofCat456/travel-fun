<script setup>
import 'swiper/css';
import 'swiper/css/navigation';

import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';

import SwiperLayout from '../../Layout/SwiperLayout.vue';
import CategoryCard from '../Card/CategoryCard.vue';
import CustomNavigation from './internal/CustomNavigation.vue';

defineProps({
  slidesPerView: {
    type: Number,
    default: 6
  },
  spaceBetween: {
    type: Number,
    default: 10
  },
  slidesPerGroup: {
    type: Number,
    default: 6
  },
  currCategory: {
    type: String,
    default: ''
  },
  categorys: {
    type: Array,
    default: () => []
  }
});

defineEmits(['updateCategory']);

const modules = [FreeMode, Navigation];

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
  <SwiperLayout is-normal no-padding class="py-0 md:py-6">
    <template #swiper>
      <Swiper
        :modules="modules"
        :slides-per-view="slidesPerView"
        :space-between="24"
        :slides-per-group="slidesPerGroup"
        :free-mode="true"
        :speed="1200"
        :navigation="{
          prevEl: '.swiper-category-custom-prev',
          nextEl: '.swiper-category-custom-next'
        }"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 'auto',
            spaceBetween: 10,
            speed: 300
          },
          '@0.75': {
            slidesPerView: slidesPerView - 2,
            spaceBetween,
            slidesPerGroup: slidesPerView - 2,
            speed: 800
          },
          '@1.00': {
            slidesPerView: slidesPerView - 1,
            spaceBetween,
            slidesPerGroup: slidesPerGroup - 1,
            speed: 1000
          },
          '@1.50': {
            slidesPerView: slidesPerView,
            spaceBetween
          }
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="category in categorys" :key="category" class="max-w-fit md:max-w-full">
          <CategoryCard
            :category="category"
            :is-active="currCategory === category"
            @click="$emit('updateCategory', category)"
          />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="category" :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
  </SwiperLayout>
</template>

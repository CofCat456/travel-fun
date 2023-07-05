<script setup>
import { ref } from 'vue';
import { v4 } from 'uuid';

import { FreeMode, Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';

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

const btnUUID = v4();

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
    <template v-slot:swiper>
      <Swiper
        :modules="modules"
        :slides-per-view="slidesPerView"
        :space-between="24"
        :slides-per-group="slidesPerGroup"
        :free-mode="true"
        :speed="1200"
        :navigation="{
          prevEl: `.swiper-${btnUUID}-custom-prev`,
          nextEl: `.swiper-${btnUUID}-custom-next`
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
      <CustomNavigation :classkey="btnUUID" :is-beginning="isBeginning" :is-end="isEnd" is-normal />
    </template>
  </SwiperLayout>
</template>

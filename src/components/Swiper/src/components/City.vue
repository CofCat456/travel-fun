<script setup lang="ts">
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { v4 } from 'uuid';
import { computed } from 'vue';

import type { SwiperOptions } from 'swiper/types';
import { useSwiper } from '../hooks/useSwiper';
import SwiperLayout from '../Layout.vue';
import CustomNavigation from './CustomNavigation.vue';
import Title from '@/components/Title.vue';
import { CityCard } from '@/components/Card';
import { cityMap } from '@/utils/context';

const {
  slidesPerView = 6,
  slidesPerGroup = 6,
  spaceBetween = 16,
  speed = 1200,
  currCity,
  btn = { text: '', pathName: '' },
} = defineProps<SwiperOptions & {
  title: string
  secTitle?: string
  currCity?: string
  btn?: {
    text: string
    pathName: string
  }
}>();

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiper();

const btnUUID = v4();

const getBindValues = computed(() => {
  return {
    slidesPerView,
    slidesPerGroup,
    spaceBetween,
    speed,
    modules: [Navigation],
    navigation: {
      prevEl: `.swiper-${btnUUID}-custom-prev`,
      nextEl: `.swiper-${btnUUID}-custom-next`,
    },
    breakpoints: {
      '@0.00': {
        slidesPerView: 3,
        spaceBetween: 12,
        speed: 300,
      },
      '@0.75': {
        slidesPerView: 4,
        spaceBetween: 12,
        speed: 800,
      },
      '@1.00': {
        slidesPerView: 5,
        speed: 1000,
      },
      '@1.50': {
        slidesPerView,
        noSwiping: true,
      },
    },
  };
});

const getCitys = computed(() => {
  if (!currCity)
    return [...cityMap.keys()];

  return [...cityMap.keys()].filter(city => cityMap.get(city) !== currCity);
});
</script>

<template>
  <SwiperLayout>
    <template #title>
      <Title :title="title" :sec-title="secTitle" />
    </template>
    <template #swiper>
      <Swiper
        :no-swiping="true"
        v-bind="getBindValues"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="city in getCitys" :key="city" class="lg:swiper-no-swiping">
          <CityCard :city="city" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation :classkey="btnUUID" :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
    <template #btn>
      <div v-if="btn.text" class="mt-6 text-center md:mb-6 md:mt-12">
        <button type="button" class="btn">
          {{ btn.text }}
        </button>
      </div>
    </template>
  </SwiperLayout>
</template>

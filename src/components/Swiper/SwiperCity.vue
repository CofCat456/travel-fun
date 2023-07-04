<script setup>
import { computed, ref } from 'vue';

import { v4 } from 'uuid';
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';

import SwiperLayout from '@/Layout/SwiperLayout.vue';

import CityCard from '../Card/CityCard.vue';
import Title from './internal/Title.vue';
import CustomNavigation from './internal/CustomNavigation.vue';

import { cityMap } from '../../utlis/context';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  secTitle: {
    type: String,
    default: ''
  },
  slidesPerView: {
    type: Number,
    default: 6
  },
  spaceBetween: {
    type: Number,
    default: 24
  },
  slidesPerGroup: {
    type: Number,
    default: 6
  },
  btn: {
    type: Object,
    default: () => ({
      text: '',
      pathName: ''
    })
  },
  currCity: {
    type: String,
    default: ''
  }
});

const modules = [Navigation];

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

const getCitys = computed(() =>
  [...cityMap.keys()].filter((city) => cityMap.get(city) !== props.currCity)
);
</script>

<template>
  <SwiperLayout>
    <template v-slot:title>
      <Title :title="title" :sec-title="secTitle" />
    </template>
    <template v-slot:swiper>
      <Swiper
        :modules="modules"
        :slides-per-view="6"
        :space-between="16"
        :slides-per-group="6"
        :speed="1200"
        :no-swiping="true"
        :navigation="{
          prevEl: `.swiper-${btnUUID}-custom-prev`,
          nextEl: `.swiper-${btnUUID}-custom-next`
        }"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 12,
            speed: 300
          },
          '@0.75': {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 12,
            speed: 800
          },
          '@1.00': {
            slidesPerView: 5,
            slidesPerGroup: 1,
            speed: 1000
          },
          '@1.50': {
            slidesPerView: 6,
            noSwiping: true
          }
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="city in getCitys" :key="city" class="lg:swiper-no-swiping">
          <CityCard :city="city" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation :classkey="btnUUID" :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
    <template v-slot:btn>
      <div v-if="btn.text" class="mt-6 text-center md:mb-6 md:mt-12">
        <button type="button" class="btn">{{ btn.text }}</button>
      </div>
    </template>
  </SwiperLayout>
</template>

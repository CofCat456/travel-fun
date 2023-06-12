<script setup>
import { computed, ref } from 'vue';

import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';

import SwiperLayout from '@/Layout/SwiperLayout.vue';

import Title from './Title.vue';
import CustomNavigation from './CustomNavigation.vue';

import { cityMap } from '../../utlis/context';
import CityCard from '../Card/CityCard.vue';

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
  curCity: {
    type: String,
    default: ''
  }
});

const modules = [Navigation];

const isBeginning = ref(true);
const isEnd = ref(false);

const btnUUID = crypto.randomUUID();

const getCitys = computed(() =>
  [...cityMap.keys()].filter((city) => cityMap.get(city) !== props.curCity)
);

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
  <SwiperLayout>
    <div class="mx-4">
      <Title :title="title" :sec-title="secTitle" />
    </div>
    <template v-slot:swiper>
      <Swiper
        :modules="modules"
        :slides-per-view="6"
        :space-between="16"
        :slides-per-group="6"
        :speed="1200"
        :navigation="{
          prevEl: `.swiper-${btnUUID}-custom-prev`,
          nextEl: `.swiper-${btnUUID}-custom-next`
        }"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            speed: 300
          },
          '@0.75': {
            slidesPerView: 4,
            slidesPerGroup: 4,
            speed: 800
          },
          '@1.00': {
            slidesPerView: 5,
            slidesPerGroup: 5,
            speed: 1000
          },
          '@1.50': {
            slidesPerView: 6
          }
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="city in getCitys" :key="city">
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

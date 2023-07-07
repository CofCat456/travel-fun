<script setup>
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { v4 } from 'uuid';
import { ref } from 'vue';

import SwiperLayout from '@/Layout/SwiperLayout.vue';

import Button from '../Base/Button.vue';
import ProductCard from '../Card/ProductCard.vue';
import Title from '../Title.vue';
import CustomNavigation from './internal/CustomNavigation.vue';

defineProps({
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
  products: {
    type: Array,
    default: () => []
  }
});

defineEmits(['btnClick']);

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
</script>

<template>
  <SwiperLayout>
    <template #title>
      <Title :title="title" :sec-title="secTitle" />
    </template>
    <template #swiper>
      <Swiper
        :modules="modules"
        :slides-per-view="slidesPerView"
        :space-between="24"
        :slides-per-group="slidesPerGroup"
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
            slidesPerView: slidesPerView - 2,
            spaceBetween: 24,
            slidesPerGroup: slidesPerView - 2,
            speed: 800
          },
          '@1.00': {
            slidesPerView: slidesPerView - 1,
            spaceBetween: 24,
            slidesPerGroup: slidesPerGroup - 1,
            speed: 1000
          },
          '@1.50': {
            slidesPerView: slidesPerView,
            spaceBetween: 24
          }
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="(product, index) in products" :key="product.title">
          <ProductCard v-bind="product" :ranking="index + 1" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation :classkey="btnUUID" :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
    <template #btn>
      <div v-if="btn.text" class="mt-6 text-center md:mb-6 md:mt-12">
        <Button @click="$emit('btnClick')">{{ btn.text }}</Button>
      </div>
    </template>
  </SwiperLayout>
</template>

<style scoped>
:deep(.swiper-btn) {
  top: calc(50% - (120px + 8px) / 2);
}
</style>

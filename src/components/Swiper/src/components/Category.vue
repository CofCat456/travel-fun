<script setup>
import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';

import { useSwiper } from '../hooks/useSwiper';
import { basicProps } from '../props';
import SwiperLayout from '../Layout.vue';
import CustomNavigation from './CustomNavigation.vue';
import { CategoryCard } from '@/components/Card';

const props = defineProps({
  ...basicProps,
  currCategory: String,
  categorys: Array,
});

defineEmits(['updateCategory']);

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiper();

const getBindValues = computed(() => {
  const { slidesPerView, slidesPerGroup } = props;

  return {
    ...props,
    modules: [FreeMode, Navigation],
    breakpoints: {
      '@0.00': {
        slidesPerView: 'auto',
        spaceBetween: 10,
        speed: 300,
      },
      '@0.75': {
        slidesPerView: slidesPerView - 2,
        slidesPerGroup: slidesPerView - 2,
        speed: 800,
      },
      '@1.00': {
        slidesPerView: slidesPerView - 1,
        slidesPerGroup: slidesPerGroup - 1,
        speed: 1000,
      },
      '@1.50': {
        slidesPerView,
        slidesPerGroup,
      },
    },
  };
});
</script>

<template>
  <SwiperLayout is-normal no-padding class="py-0 md:py-6">
    <template #swiper>
      <Swiper
        :free-mode="true"
        v-bind="getBindValues"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide
          v-for="category in categorys || []"
          :key="category"
          class="max-w-fit md:max-w-full"
        >
          <CategoryCard
            :category="category"
            :is-active="(currCategory ?? '') === category"
            @click="$emit('updateCategory', category)"
          />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="category" :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
  </SwiperLayout>
</template>

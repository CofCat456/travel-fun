<script setup lang="ts">
import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';

import type { SwiperOptions } from 'swiper/types';
import { useSwiper } from '../hooks/useSwiper';
import SwiperLayout from '../Layout.vue';
import CustomNavigation from './CustomNavigation.vue';
import { CategoryCard } from '@/components/Card';

const {
  slidesPerView = 6,
  slidesPerGroup = 6,
  spaceBetween = 24,
  speed = 1200,
} = defineProps<SwiperOptions & {
  currCategory?: string
  categorys: string[]
}>();

defineEmits<{
  (e: 'updateCategory', category: string): void
}>();

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiper();

const getBindValues = computed(() => {
  return {
    slidesPerView,
    slidesPerGroup,
    spaceBetween,
    speed,
    modules: [FreeMode, Navigation],
    FreeMode: true,
    breakpoints: {
      '@0.00': {
        slidesPerView: 'auto' as number | 'auto',
        spaceBetween: 10,
        speed: 300,
      },
      '@0.75': {
        slidesPerView: Number(slidesPerView) - 2,
        slidesPerGroup: Number(slidesPerView) - 2,
        speed: 800,
      },
      '@1.00': {
        slidesPerView: Number(slidesPerView) - 1,
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

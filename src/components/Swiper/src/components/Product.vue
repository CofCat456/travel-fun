<script setup lang="ts">
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { v4 } from 'uuid';
import { computed } from 'vue';

import type { SwiperOptions } from 'swiper/types';
import { useSwiper } from '../hooks/useSwiper';
import SwiperLayout from '../Layout.vue';
import CustomNavigation from './CustomNavigation.vue';
import type { Product } from '@/types';
import type { TitleProps } from '@/components/Title.vue';
import Title from '@/components/Title.vue';
import Button from '@/components/Base/Button.vue';
import { ProductCard } from '@/components/Card';

const {
  slidesPerView = 6,
  slidesPerGroup = 6,
  spaceBetween = 24,
  speed = 1200,
  loop = true,
  btn = { text: '', pathName: '' },
} = defineProps<TitleProps & SwiperOptions & {
  products: Product[]
  isNormal?: boolean
  noPadding?: boolean
  btn?: {
    text: string
    pathName?: string
  }
}>();

defineEmits<{
  btnClick: []
}>();

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiper();

const btnUUID = v4();

const getBindValues = computed(() => {
  return {
    modules: [Navigation],
    breakpoints: {
      '@0.00': {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        spaceBetween,
        speed: 300,
        loop,
      },
      '@0.75': {
        slidesPerView: Number(slidesPerView) - 2,
        slidesPerGroup: Number(slidesPerGroup) - 2,
        spaceBetween,
        speed: 800,
        loop,
      },
      '@1.00': {
        slidesPerView: Number(slidesPerView) - 1,
        slidesPerGroup: slidesPerGroup - 1,
        spaceBetween,
        speed: 1000,
        loop,
      },
      '@1.50': {
        slidesPerView,
        slidesPerGroup,
        spaceBetween,
        speed,
        loop,
      },
    },
    navigation: {
      prevEl: `.swiper-${btnUUID}-custom-prev`,
      nextEl: `.swiper-${btnUUID}-custom-next`,
    },
  };
});
</script>

<template>
  <SwiperLayout :is-normal="isNormal" :no-padding="noPadding">
    <template #title>
      <Title :title="title" :sec-title="secTitle" />
    </template>
    <template #swiper>
      <Swiper
        v-bind="getBindValues"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(product, index) in products" :key="product.title">
          <ProductCard v-bind="product" :ranking="index + 1" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation :classkey="btnUUID" :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
    <template #btn>
      <div v-if="btn.text" class="mt-6 text-center md:mb-6 md:mt-12">
        <Button @click="$emit('btnClick')">
          {{ btn.text }}
        </Button>
      </div>
    </template>
  </SwiperLayout>
</template>

<style scoped>
:deep(.swiper-btn) {
  top: calc(50% - (120px + 8px) / 2);
}
</style>

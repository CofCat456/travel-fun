<script setup>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { v4 } from 'uuid';
import { computed } from 'vue';

import { useSwiper } from '../hooks/useSwiper';
import SwiperLayout from '../Layout.vue';
import { basicProps } from '../props';
import CustomNavigation from './CustomNavigation.vue';
import Title from '@/components/Title.vue';
import Button from '@/components/Base/Button.vue';
import { ProductCard } from '@/components/Card';

const props = defineProps({
  ...basicProps,
  title: {
    type: String,
    default: '',
  },
  secTitle: {
    type: String,
    default: '',
  },
  products: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['btnClick']);

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiper();

const btnUUID = v4();

const getBindValues = computed(() => {
  const { slidesPerView, slidesPerGroup } = props;

  return {
    ...props,
    modules: [Navigation],
    navigation: {
      prevEl: `.swiper-${btnUUID}-custom-prev`,
      nextEl: `.swiper-${btnUUID}-custom-next`,
    },
    breakpoints: {
      '@0.00': {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
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
      },
    },
  };
});
</script>

<template>
  <SwiperLayout>
    <template #title>
      <Title :title="title" :sec-title="secTitle" />
    </template>
    <template #swiper>
      <Swiper
        :navigation="{
          prevEl: `.swiper-${btnUUID}-custom-prev`,
          nextEl: `.swiper-${btnUUID}-custom-next`,
        }"
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

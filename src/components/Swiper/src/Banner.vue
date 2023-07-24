<script setup>
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';

import CustomNavigation from './components/CustomNavigation.vue';
import { useSwiper } from './hooks/useSwiper';
import SwiperLayout from './Layout.vue';
import { basicProps } from './props';

const props = defineProps({
  ...basicProps
});

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiper();

const getBindValues = computed(() => ({
  ...props,
  modules: [Navigation, Pagination],
  navigation: {
    prevEl: '.swiper-banner-custom-prev',
    nextEl: '.swiper-banner-custom-next'
  }
}));

const pagination = () => ({
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className}"></span>`;
  }
});
</script>

<template>
  <SwiperLayout is-normal>
    <template #swiper>
      <Swiper
        :pagination="pagination()"
        v-bind="getBindValues"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="imageUrl in imagesUrl" :key="imageUrl" class="bg-sky-300">
          <img :src="imageUrl" />
        </SwiperSlide>
      </Swiper>
      <CustomNavigation classkey="banner" is-normal :is-beginning="isBeginning" :is-end="isEnd" />
    </template>
  </SwiperLayout>
</template>

<style scoped>
img {
  @apply aspect-video object-cover object-center;
}

:deep(.swiper-pagination-bullet) {
  @apply h-2 w-2 border border-cc-other-1 bg-cc-other-1/30 opacity-70 hover:opacity-90;
}

:deep(.swiper-pagination-bullet-active) {
  @apply scale-150 border-cc-other-1 bg-cc-other-1;
}
</style>

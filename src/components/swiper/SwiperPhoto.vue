<script setup>
import { computed } from 'vue';

import { Pagination, Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import UploadBlock from './internal/UploadBlock.vue';

const modules = [Pagination, Navigation];

const props = defineProps({
  imagesUrl: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['open-file-input', 'updateActiveIndex']);

const imagesUrl = computed(() => props.imagesUrl);

const onSlideChange = (swiper) => {
  const { activeIndex } = swiper;
  emit('updateActiveIndex', activeIndex);
};
</script>

<template>
  <Swiper
    :style="{
      '--swiper-navigation-color': '#0F4BB4',
      '--swiper-pagination-color': '#0F4BB4'
    }"
    :lazy="true"
    :pagination="{
      clickable: true
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper aspect-[3/2] rounded-m"
    @slideChange="onSlideChange"
  >
    <SwiperSlide v-for="imageIndex in imagesUrl.length + 1" :key="imageIndex">
      <template v-if="imagesUrl.length >= imageIndex && imagesUrl[imageIndex - 1]">
        <img
          loading="lazy"
          class="mx-auto max-h-full w-full object-cover"
          :src="imagesUrl[imageIndex - 1]"
        />
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
      </template>
      <UploadBlock v-else @open-file-input="$emit('open-file-input')" />
    </SwiperSlide>
  </Swiper>
</template>

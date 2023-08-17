import { ref } from 'vue';
import type { Swiper } from 'swiper/types';

export function useSwiper() {
  const isBeginning = ref(true);
  const isEnd = ref(false);

  const onSwiper = (swiper: Swiper) => {
    isBeginning.value = swiper?.isBeginning;
    isEnd.value = swiper?.isEnd;
  };
  const onSlideChange = (swiper: Swiper) => {
    isBeginning.value = swiper?.isBeginning;
    isEnd.value = swiper?.isEnd;
  };

  return { isBeginning, isEnd, onSwiper, onSlideChange };
}

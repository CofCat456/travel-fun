import { ref } from 'vue';

export function useSwiper() {
  const isBeginning = ref(true);
  const isEnd = ref(false);

  const onSwiper = (swiper) => {
    isBeginning.value = swiper?.isBeginning;
    isEnd.value = swiper?.isEnd;
  };
  const onSlideChange = (swiper) => {
    isBeginning.value = swiper?.isBeginning;
    isEnd.value = swiper?.isEnd;
  };

  return { isBeginning, isEnd, onSwiper, onSlideChange };
}

import { defineStore } from 'pinia';
import { onMounted, ref, watchEffect } from 'vue';

const useDeviceStore = defineStore('device', () => {
  const isMobile = ref(false);

  // window width
  const windowWidth = ref(window.innerWidth);

  watchEffect(() => {
    if (windowWidth.value < 768)
      isMobile.value = true;
    else
      isMobile.value = false;
  });

  onMounted(() => {
    window.addEventListener('resize', () => {
      windowWidth.value = window.innerWidth;
    });
  });

  return { windowWidth, isMobile };
});

export default useDeviceStore;

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { cityMap } from '@/utils/context';

const { city } = defineProps<{
  city: string
}>();

const getName = computed<string>(() => cityMap.get(city));

const getImage = computed(() => `/images/city/city_${city}.jpg`);
</script>

<template>
  <RouterLink
    class="relative block w-full overflow-hidden rounded-m"
    :to="{ name: 'City', params: { cityName: city } }"
  >
    <div
      class="clear-scale h-40 w-full cursor-pointer rounded-m bg-cc-other-3 bg-cover bg-center transition-transform duration-500 md:h-60"
      :style="`background-image: url(${getImage})`"
    />
    <h5
      class="absolute bottom-3 left-3 text-sm font-bold text-white md:text-xl"
      style="transform: translate3d(0, 0, 0)"
    >
      {{ getName }}
    </h5>
  </RouterLink>
</template>

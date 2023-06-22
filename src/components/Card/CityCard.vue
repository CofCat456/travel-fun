<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { cityMap } from '../../utlis/context';

const props = defineProps({
  city: {
    type: String,
    default: ''
  }
});

const getName = computed(() => cityMap.get(props.city));

const getImage = computed(() => `/images/city/city_${props.city}.jpg`);
</script>

<template>
  <RouterLink
    class="relative block w-full overflow-hidden rounded-m"
    :to="{ name: 'City', params: { cityName: props.city } }"
  >
    <div
      class="h-60 w-full cursor-pointer rounded-m bg-cc-other-3 bg-cover bg-center transition-transform duration-500 hover:scale-110"
      :style="`background-image: url(${getImage})`"
    />
    <h5 class="absolute bottom-3 left-3 font-bold text-white">{{ getName }}</h5>
  </RouterLink>
</template>

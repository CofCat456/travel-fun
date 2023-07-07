<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import Title from '@/components/Title.vue';
import Container from '@/Layout/Container.vue';

const props = defineProps({
  hotCitys: {
    type: Array,
    default: () => []
  }
});

const router = useRouter();

// TODO: 資料來源

const mainCity = computed(() => {
  return props.hotCitys.length > 0 ? props.hotCitys[0] : '';
});

const otherCity = computed(() => {
  return props.hotCitys.slice(1);
});

const goCity = (cityName) => router.push(`/city/${cityName.toLowerCase()}`);
</script>

<template>
  <div class="bg-cc-other-7 pt-12 pb-6 md:pb-20">
    <Container>
      <Title title="熱門城市" sec-title="探索最熱門的城市，發現更多令人驚嘆的旅程！" />
      <div v-if="hotCitys" class="grid grid-rows-2 gap-3 md:grid-flow-col md:gap-6">
        <div
          class="relative col-span-2 row-span-2 overflow-hidden rounded-m"
          @click="goCity(mainCity.enName)"
        >
          <img
            :src="mainCity.image"
            :alt="mainCity.name"
            class="clear-scale h-full w-full cursor-pointer object-cover transition-transform duration-500"
          />
          <div class="absolute left-3 bottom-3 font-bold text-white">
            <h3 class="mb-1">{{ mainCity.name }}</h3>
            <p>{{ mainCity.enName }}</p>
          </div>
        </div>
        <div
          v-for="city in otherCity"
          :key="city.name"
          class="relative overflow-hidden rounded-m"
          @click="goCity(city.enName)"
        >
          <img
            :src="city.image"
            :alt="city.name"
            class="clear-scale h-full w-full cursor-pointer object-cover transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute left-3 bottom-3 font-bold text-white">
            <p class="text-area-title mb-1">{{ city.name }}</p>
            <p class="text-sm">{{ city.enName }}</p>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

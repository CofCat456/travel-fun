<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Container from '@/Layout/Container.vue';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SwiperCategory from '@/components/Swiper/SwiperCategory.vue';

import { cityMap, categoryMap } from '@/utlis/context';

const route = useRoute();
const { cityName } = route.params;

const getCityName = computed(() => cityMap.get(route.params.cityName));

const getCategorys = computed(() => ['', ...categoryMap.keys()]);

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home'
  },
  {
    title: getCityName.value,
    pathName: 'City',
    params: { cityName }
  },
  {
    title: '所有活動'
  }
]);
</script>

<template>
  <div class="bg-cc-other-7 pt-6">
    <Container>
      <Breadcrumbs :breadcrumbs="getBreadcrumbs" />
      <h1 class="text-3xl font-bold">{{ `${getCityName} 所有活動` }}</h1>
      <SwiperCategory :curr-category="route.params.category" :categorys="getCategorys" />
    </Container>
  </div>
</template>

<script setup>
import Container from '@/Layout/Container.vue';
import SwiperNews from '@/components/swiper/SwiperNews.vue';

import Banner from './components/Banner.vue';

import { mockNews } from './_Context';
</script>

<template>
  <main class="min-h-[200vh] bg-cc-other-7">
    <Banner />
    <Container>
      <SwiperNews :news="mockNews" />
    </Container>
    <img src="/images/home-bg.png" alt="travel world fun" class="-z-10 -translate-y-8" />
  </main>
</template>

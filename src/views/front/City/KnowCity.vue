<script setup>
import { computed } from 'vue';

import Container from '@/Layout/Container.vue';

const props = defineProps({
  cityName: {
    type: String,
    default: ''
  }
});

const getTitle = computed(() => `認識 ${props.cityName}`);
</script>

<template>
  <div class="my-6 bg-cc-other-7 py-6">
    <Container>
      <h3 class="my-6 font-bold">{{ getTitle }}</h3>
      <div class="mb-6 flex min-h-[240px] items-stretch rounded-m bg-white shadow">
        <div class="flex-1 break-all p-6 text-base leading-relaxed">
          新北市有許多知名觀光景點。體驗原住民文化、享受泡湯的烏來，懷舊風情的九份，感受大自然力量的東北角、野柳，鶯歌陶瓷、三峽老街等。都是假日散心的好去處。嚴選新北市自由行特色商品及活動行程，讓你與親朋好友搭乘便利交通工具輕鬆出遊新北市，享用特色美食，自由行就是這麼簡單！
        </div>
        <div class="w-96 bg-cc-accent">123</div>
      </div>
    </Container>
  </div>
</template>

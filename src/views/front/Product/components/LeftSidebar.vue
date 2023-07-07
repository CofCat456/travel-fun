<script setup>
import Title from '@/components/Title.vue';

defineProps({
  description: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <Title page title="活動特色" />
  <ul class="list-disc pl-6 text-base tracking-wide">
    <li class="py-1">一整天的活動，包括觀光、戶外活動、美味的在地餐點等。</li>
    <li class="py-1">特別安排觀賞美麗的鶯歌景觀，體驗不一樣的自然風光。</li>
    <li class="py-1">提供專業的導遊，講解鶯歌的生態與歷史。</li>
    <li class="py-1">多種戶外活動可供選擇，徒步旅行、騎單車、釣魚等。</li>
  </ul>
</template>

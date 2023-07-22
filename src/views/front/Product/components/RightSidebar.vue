<script setup>
import { NAffix } from 'naive-ui';

import Button from '@/components/Base/Button.vue';
import { currency, scrollTo } from '@/utlis/global';

defineProps({
  price: {
    type: Number,
    default: 0
  },
  origin_price: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <n-affix :trigger-top="-620" class="min-w-[300px]" :top="130">
    <div class="rounded-2xl border border-cc-other-5/50 bg-cc-other-1 p-5">
      <div class="mb-4">
        <span class="mr-1 text-2xl font-bold">{{ currency(price, 'NT$ ') }}</span>
        <span class="text-sm text-cc-other-4 line-through">{{
          currency(origin_price, 'NT$ ')
        }}</span>
      </div>
      <Button is-full @click="scrollTo('plan')"> 選擇方案 </Button>
    </div>
  </n-affix>
</template>

<script setup lang="ts">
import {
  NCard,
  NGradientText,
  NGrid,
  NGridItem,
} from 'naive-ui';
import { currency } from '@/utils/global';
import Button from '@/components/Base/Button.vue';

defineProps<{
  text: string
  total: number
  finalTotal: number
  isLoading?: boolean
}>();

defineEmits<{
  (e: 'submit'): void
}>();
</script>

<template>
  <article class="w-full md:w-80">
    <NCard :bordered="false">
      <NGrid :x-gap="50" :y-gap="12" :cols="2">
        <NGridItem>
          價格
        </NGridItem>
        <NGridItem class="font-bold text-right">
          {{ currency(total) }}
        </NGridItem>

        <NGridItem>
          付款金額
        </NGridItem>
        <NGridItem class="font-bold text-right text-xl text-cc-primary">
          {{ currency(finalTotal) }}
        </NGridItem>

        <NGridItem v-if="total !== finalTotal" :span="2">
          <NGradientText type="success">
            已套用優惠卷!
          </NGradientText>
        </NGridItem>

        <NGridItem :span="2">
          <Button type="submit" class="mt-4" is-full :is-loading="isLoading" @click="$emit('submit')">
            {{ text }}
          </Button>
        </NGridItem>
      </NGrid>
    </NCard>
  </article>
</template>

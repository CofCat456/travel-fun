<script setup lang="ts">
import { NCard, NSelect } from 'naive-ui';
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface';
import type { Sort } from '@/types';

defineProps<{
  currSort: string
  sortArray: SelectMixedOption[]
  productTotal: number
}>();

defineEmits<{
  (e: 'update:sort', item: Sort): void
}>();
</script>

<template>
  <NCard size="small">
    <div class="flex w-full items-center justify-between">
      <p class="font-bold">
        找到
        <span class="text-cc-primary">
          {{ productTotal }}
        </span>
        個旅途
      </p>
      <div class="inline-flex items-center gap-4 whitespace-nowrap">
        <span>排序方式：</span>
        <NSelect
          :consistent-menu-width="false"
          :options="sortArray || []"
          :value="currSort || ''"
          @update-value="(value) => $emit('update:sort', value)"
        />
      </div>
    </div>
  </NCard>
</template>

<script setup>
import { NCard, NSelect } from 'naive-ui';

defineProps({
  currSort: String,
  sortArray: Array,
  productTotal: Number
});

defineEmits(['updateSort']);
</script>

<template>
  <n-card size="small">
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
        <n-select
          :consistent-menu-width="false"
          :options="sortArray || []"
          :value="currSort || ''"
          @update-value="(value) => $emit('updateSort', value)"
        />
      </div>
    </div>
  </n-card>
</template>

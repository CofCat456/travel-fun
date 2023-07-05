<script setup>
import DropdownMenu from '@/components/Menu/DropdownMenu.vue';

import { sortMap } from '@/utlis/context';

defineProps({
  currSort: {
    type: String,
    default: ''
  },
  sortArray: {
    type: Array,
    default: () => []
  },
  productTotal: {
    type: Number,
    defautl: 0
  }
});

defineEmits(['updateSort']);
</script>

<template>
  <div
    class="flex w-full items-center justify-between rounded-m border border-cc-other-5 px-4 py-3"
  >
    <p class="font-bold">
      找到
      <span class="text-cc-primary">
        {{ productTotal }}
      </span>
      個旅途
    </p>
    <div class="inline-flex items-center gap-4">
      <span>排序方式：</span>
      <DropdownMenu :value="currSort">
        <template v-slot:dropdown-item>
          <li
            v-for="query in sortArray"
            :key="query"
            :class="query === currSort && 'active'"
            @click="$emit('updateSort', query)"
          >
            <p>
              {{ sortMap.get(query) }}
            </p>
          </li>
        </template>
      </DropdownMenu>
    </div>
  </div>
</template>

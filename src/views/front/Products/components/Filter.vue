<script setup>
import FilterMenu from '@/components/FilterMenu.vue';

import { sortMap } from '@/utlis/context';
import { computed } from 'vue';

defineProps({
  sort: {
    type: String,
    default: ''
  },
  productTotal: {
    type: Number,
    defautl: 0
  }
});

const getFilterList = computed(() => [...sortMap.keys()]);

const sortQuery = (query) => {
  if (query) return { name: 'Products', query: { sort: query } };

  return { name: 'Products' };
};
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
      <FilterMenu :sort="sort">
        <template v-slot:dropdown-item>
          <li v-for="query in getFilterList" :key="query" :class="query === sort && 'active'">
            <RouterLink :to="sortQuery(query)">{{ sortMap.get(query) }}</RouterLink>
          </li>
        </template>
      </FilterMenu>
    </div>
  </div>
</template>

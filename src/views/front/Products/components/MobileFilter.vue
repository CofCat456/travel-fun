<script setup>
import FilterMenu from '@/components/Base/Menu/FilterMenu.vue';
import { cityMap, countryMap, sortMap } from '@/utlis/context';

defineProps({
  isCity: Boolean,
  currEnTarget: String,
  array: Array,
  currSort: String,
  sortArray: Array
});

defineEmits(['updateParams', 'updateSort', 'openMap']);

const cityText = (city) => `${cityMap.get(city.key)}市`;
const countryText = (country) => countryMap.get(country);
</script>

<template>
  <div class="sticky top-28 z-20 block bg-cc-other-1 md:hidden">
    <div class="flex h-12 items-center">
      <div class="mx-5 inline-flex flex-1 items-center gap-2 overflow-x-auto">
        <FilterMenu :title="isCity ? '城市' : '國家'">
          <li
            v-for="item in array || []"
            :key="item"
            class="flex cursor-pointer items-center justify-between border-t border-cc-other-5/50 px-4 py-2"
            @click="$emit('updateParams', item.key)"
          >
            {{ isCity ? cityText(item) : countryText(item) }}
            <svg
              v-if="item.key === currEnTarget"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 text-cc-accent"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </li>
        </FilterMenu>
        <FilterMenu title="排列">
          <li
            v-for="query in sortArray || []"
            :key="query"
            class="flex cursor-pointer items-center justify-between border-t border-cc-other-5/50 px-4 py-2"
            @click="$emit('updateSort', query.value)"
          >
            {{ sortMap.get(query.value) }}
            <svg
              v-if="query.value === currSort"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 text-cc-accent"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </li>
        </FilterMenu>
      </div>
      <div class="p-3 shadow-[-5px_0_5px_-5px_rgba(50,48,44,.3)]">
        <button type="button" class="block" @click="$emit('openMap')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

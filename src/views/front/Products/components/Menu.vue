<script setup>
import { cityMap, countryMap } from '@/utlis/context';

defineProps({
  isCity: {
    type: Boolean,
    default: true
  },
  currEnTarget: {
    type: String,
    default: ''
  },
  array: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['updateParams']);

const selectHandler = (params) => {
  return emit('updateParams', params);
};
</script>

<template>
  <div class="max-h-[650px] overflow-x-hidden overflow-y-scroll rounded-m border border-cc-other-5">
    <h6 class="inline-flex items-center gap-1 px-4 pt-5 pb-3 font-semibold">
      <span class="material-icons-outlined text-cc-other-2"> local_airport </span>
      目的地
    </h6>
    <ul v-for="item in array" :key="item" class="flex flex-col justify-center">
      <li
        class="cursor-pointer px-8 py-3 transition-colors hover:bg-cc-other-6/40"
        :class="array.length === 1 && 'cursor-not-allowed opacity-60'"
        @click="selectHandler(item)"
      >
        <div class="flex items-center gap-2">
          <input type="checkbox" class="h-5 w-5" :checked="item === currEnTarget" />
          <span>{{ isCity ? `${cityMap.get(item)}市` : countryMap.get(item) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

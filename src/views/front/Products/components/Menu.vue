<script setup>
import { computed } from 'vue';
import { cityMap } from '@/utlis/context';

defineProps({
  currEnCity: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['updateCity']);

const getEnCitys = computed(() => [...cityMap.keys()]);

const selectHandler = (enCity) => {
  emit('updateCity', enCity);
};
</script>

<template>
  <div class="max-h-[650px] overflow-x-hidden overflow-y-scroll rounded-m border border-cc-other-5">
    <h6 class="inline-flex items-center gap-1 px-4 pt-5 pb-3 font-semibold">
      <span class="material-icons-outlined text-cc-other-2"> local_airport </span>
      目的地
    </h6>
    <ul v-for="enCity in getEnCitys" :key="enCity" class="flex flex-col justify-center">
      <li
        class="cursor-pointer px-8 py-3 transition-colors hover:bg-cc-other-6/40"
        @click="selectHandler(enCity)"
      >
        <div class="flex items-center gap-2">
          <input type="checkbox" class="h-5 w-5" :checked="enCity === currEnCity" />
          <span>{{ cityMap.get(enCity) }}市</span>
        </div>
      </li>
    </ul>
  </div>
</template>

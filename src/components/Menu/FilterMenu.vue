<script setup>
import { ref } from 'vue';

import BottomSheet from '../Modal/BottomSheet.vue';

defineProps({
  title: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
});

const bottomSheetRef = ref(null);

const openBottomSheet = () => bottomSheetRef.value.show();
const hideBottomSheet = () => bottomSheetRef.value.hide();
</script>

<template>
  <div class="btn-filter" @click="openBottomSheet">
    <div class="whitespace-nowrap text-sm text-cc-other-3">{{ title }}</div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-4 w-4"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  </div>
  <BottomSheet ref="bottomSheetRef">
    <template v-slot:header>{{ title }}</template>
    <template v-slot:bottom-sheet-item>
      <ul style="margin: 0" @click="hideBottomSheet">
        <slot />
      </ul>
    </template>
  </BottomSheet>
</template>

<style scoped>
.btn-filter {
  @apply inline-flex cursor-pointer items-center gap-1 rounded-3xl border border-cc-other-5 bg-cc-other-1 px-3 py-[6px];
}
</style>

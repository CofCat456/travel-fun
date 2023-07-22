<script setup>
import { NDrawer, NDrawerContent } from 'naive-ui';
import { ref } from 'vue';

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

const show = ref(false);
</script>

<template>
  <div class="btn-filter" @click="show = true">
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
  <n-drawer placement="bottom" v-model:show="show">
    <n-drawer-content :title="title" closable>
      <ul style="margin: 0" @click="hideBottomSheet">
        <slot />
      </ul>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.btn-filter {
  @apply inline-flex cursor-pointer items-center gap-1 rounded-3xl border border-cc-other-5 bg-cc-other-1 px-3 py-[6px];
}
</style>

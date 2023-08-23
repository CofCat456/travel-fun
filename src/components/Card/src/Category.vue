<script setup lang="ts">
import { computed } from 'vue';

import { categoryMap } from '@/utils/context';

const { category } = defineProps<{
  isActive: boolean
  category: string
}>();

const getCategory = computed<string>(() => categoryMap.get(category) || '所有活動');
</script>

<template>
  <div
    class="relative flex w-full cursor-pointer flex-wrap items-center rounded-m px-5 py-3 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:rounded-t-m after:bg-cc-primary hover:border-cc-primary hover:text-cc-primary md:h-16 md:bg-cc-other-1 md:py-0 md:shadow md:after:hidden"
    :class="
      isActive
        ? 'text-cc-primary md:border-2 md:border-cc-primary'
        : 'md:border md:border-cc-other-5 '
    "
  >
    <p class="text-base font-bold md:text-lg">
      {{ getCategory }}
    </p>
  </div>
</template>

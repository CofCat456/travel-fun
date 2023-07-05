<script setup>
import { computed } from 'vue';

import { categoryMap } from '../../utlis/context';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ''
  }
});

const getCategory = computed(() => categoryMap.get(props.category) || '所有活動');
</script>

<template>
  <div class="categoryCard" :class="isActive && 'active'">
    <p class="text-base font-bold md:text-lg">
      {{ getCategory }}
    </p>
  </div>
</template>

<style scoped>
.categoryCard {
  @apply relative flex w-full cursor-pointer flex-wrap items-center rounded-m px-5 py-3 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:rounded-t-m after:bg-cc-primary hover:border-cc-primary hover:text-cc-primary md:h-16 md:border md:border-cc-other-5 md:bg-cc-other-1 md:py-0 md:shadow md:after:hidden;
}

.active {
  @apply text-cc-primary after:w-full md:border-2 md:border-cc-primary;
}
</style>

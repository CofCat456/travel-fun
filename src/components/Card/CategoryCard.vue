<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

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

const router = useRouter();

const getCategory = computed(() => categoryMap.get(props.category) || '所有活動');

const goCategory = () => router.push({ name: 'Products', params: { category: props.category } });
</script>

<template>
  <div
    class="flex h-16 w-full cursor-pointer items-center rounded-m bg-cc-other-1 px-3 shadow transition-colors duration-300 hover:border-cc-primary hover:text-cc-primary"
    :class="isActive ? 'border-2 border-cc-primary text-cc-primary' : 'border border-cc-other-5'"
    @click="goCategory"
  >
    <p class="text-lg font-bold">
      {{ getCategory }}
    </p>
  </div>
</template>

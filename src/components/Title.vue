<script setup>
const props = defineProps({
  page: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  secTitle: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="flex items-start gap-2" :class="page ? 'mb-5' : 'mb-6'">
    <div class="mt-2 h-2 w-2 bg-cc-primary" />
    <div>
      <h3 class="mb-2 text-xl font-bold md:text-[28px]">{{ props.title }}</h3>
      <h6 v-if="secTitle" class="break-all text-sm text-cc-other-4 md:text-base">
        {{ props.secTitle }}
      </h6>
    </div>
  </div>
</template>

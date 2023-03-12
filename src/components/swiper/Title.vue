<script setup>
const props = defineProps({
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
  <div class="mx-4 mb-6 flex items-start gap-2">
    <div class="mt-2 h-2 w-2 bg-cc-primary" />
    <div>
      <h3 class="mb-2 font-bold">{{ props.title }}</h3>
      <h6 v-if="secTitle" class="break-all text-cc-other-4">{{ props.secTitle }}</h6>
    </div>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <span v-if="status" class="material-icons-outlined icon-hover text-cc-accent"> favorite </span>
  <span v-else class="material-icons-outlined icon-hover"> favorite_border </span>
</template>

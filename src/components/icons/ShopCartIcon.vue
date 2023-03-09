<script setup>
defineProps({
  shopCartNum: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="relative h-6 w-6">
    <span class="material-icons-outlined icon-hover"> shopping_cart </span>
    <div
      class="absolute -right-3 -top-3 m-0 h-full w-full rounded-full bg-cc-accent p-0 text-center text-white"
    >
      {{ shopCartNum }}
    </div>
  </div>
</template>

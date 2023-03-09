<script setup>
const props = defineProps({
  evaluate: {
    type: Number,
    default: 0
  },
  evaluateTotal: {
    type: Number,
    default: 0
  }
});

const fillNum = Math.floor(props.evaluate);
const halfNum = props.evaluate % 1;
const outlineNum = 5 - Math.ceil(props.evaluate);
</script>

<template>
  <div class="flex items-center gap-1">
    <div class="inline-flex items-center text-cc-accent">
      <span v-for="star in fillNum" :key="star" class="material-icons-outlined"> star </span>
      <span v-if="halfNum" class="material-icons-outlined"> star_half </span>
      <span v-for="star in outlineNum" :key="star" class="material-icons-outlined">
        star_outline
      </span>
    </div>
    <p class="text-sm leading-normal">{{ evaluate.toFixed(1) }}</p>
    <p class="text-sm leading-normal text-cc-other-3">({{ evaluateTotal }})</p>
  </div>
</template>

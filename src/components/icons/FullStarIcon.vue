<script setup>
const props = defineProps({
  sm: {
    type: Boolean,
    default: false
  },
  showEvaluate: {
    type: Boolean,
    default: true
  },
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
      <span v-for="star in fillNum" :key="star" class="material-icons-outlined" :class="{ sm: sm }">
        star
      </span>
      <span v-if="halfNum" class="material-icons-outlined" :class="{ sm: sm }"> star_half </span>
      <span
        v-for="star in outlineNum"
        :key="star"
        class="material-icons-outlined"
        :class="{ sm: sm }"
      >
        star_outline
      </span>
    </div>
    <p v-if="showEvaluate" class="text-sm-content text-cc-accent">{{ evaluate.toFixed(1) }}</p>
    <p class="text-sm-content text-cc-other-3">({{ evaluateTotal }})</p>
  </div>
</template>

<style scoped>
.sm {
  font-size: 16px;
}
</style>

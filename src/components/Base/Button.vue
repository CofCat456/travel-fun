<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  isLoading?: boolean
  isFull?: boolean
}
>(), {
  type: 'button',
});
</script>

<template>
  <button :type="type" class="btn" :class="isFull ? 'w-full' : ''" :disabled="isLoading || disabled">
    <slot v-if="isLoading" name="loading">
      <svg
        class="h-6 w-6 animate-spin py-1 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </slot>
    <slot v-else name="icon" />
    <slot> text </slot>
  </button>
</template>

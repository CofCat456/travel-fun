<script setup lang="ts">
export interface TitleProps {
  page?: boolean
  title: string
  secTitle?: string
}

defineProps<TitleProps>();
</script>

<template>
  <div class="flex items-start gap-2" :class="page ? 'mb-5' : 'mb-6'">
    <div class="mt-2 h-2 w-2 bg-cc-primary" />
    <div>
      <h3 class="mb-2 text-xl font-bold md:text-[28px]">
        {{ title }}
      </h3>
      <h6 v-if="secTitle" class="break-all text-sm text-cc-other-4 md:text-base">
        {{ secTitle }}
      </h6>
    </div>
  </div>
</template>

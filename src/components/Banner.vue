<script setup lang="ts">
defineProps<{
  bgUrl: string
  center?: boolean
  multiply?: boolean
}>();
</script>

<template>
  <div
    class="relative mb-12 flex h-[360px] w-full items-end bg-cover bg-center bg-no-repeat px-3 py-8 md:mb-5"
    :style="`background-image: url(${bgUrl})`"
    :class="[
      center ? '' : 'lg:bg-[center_-100px]',
      multiply ? 'bg-black/20 bg-blend-multiply' : '',
    ]"
  >
    <div
      class="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-serif text-white"
    >
      <div class="text-title mb-4 flex flex-col justify-center sm:flex-row lg:gap-6">
        <slot name="title" />
      </div>
      <h1 class="text-sec-title">
        <slot name="sec-title" />
      </h1>
    </div>
    <slot />
  </div>
</template>

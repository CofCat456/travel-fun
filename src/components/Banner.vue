<script setup>
defineProps({
  bgUrl: {
    type: String,
    default: ''
  },
  center: {
    type: Boolean,
    default: true
  },
  multiply: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    class="relative mb-12 flex h-[360px] w-full items-end bg-cover bg-center bg-no-repeat px-3 py-8 md:mb-5"
    :class="[!center && 'lg:bg-[center_-100px]', multiply && 'bg-black/20 bg-blend-multiply']"
    :style="`background-image: url(${bgUrl})`"
  >
    <div
      class="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-serif text-white"
    >
      <h1 class="text-title mb-4 flex flex-col justify-center sm:flex-row lg:gap-6">
        <slot name="title"> </slot>
      </h1>
      <h2 class="text-sec-title">
        <slot name="sec-title"> </slot>
      </h2>
    </div>
    <slot></slot>
  </div>
</template>

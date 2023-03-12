<script setup></script>

<template>
  <div class="mx-auto w-full px-3 md:px-4 lg:max-w-[1328px] xl:px-0">
    <slot></slot>
    <div class="relative px-0 xl:px-4">
      <slot name="swiper"></slot>
    </div>
  </div>
</template>

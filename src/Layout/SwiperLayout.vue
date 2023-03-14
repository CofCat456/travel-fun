<script setup></script>

<template>
  <section class="mx-auto w-full px-3 pb-8 md:py-6 md:px-4 lg:max-w-[1328px] xl:px-0">
    <slot></slot>
    <div class="relative px-0 xl:px-4">
      <slot name="swiper"></slot>
    </div>
    <slot name="btn"> </slot>
  </section>
</template>

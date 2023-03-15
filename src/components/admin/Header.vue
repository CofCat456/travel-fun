<script setup>
import Logo from '../Logo.vue';
</script>

<template>
  <nav
    class="flex flex-wrap items-center justify-between bg-black/30 p-6 text-white backdrop-blur-[25px]"
  >
    <div class="mr-6 flex flex-shrink-0 items-center text-white">
      <Logo />
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white"
      >
        <svg class="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
      <div class="text-sm lg:flex-grow">
        <a
          href="#responsive-header"
          class="mt-4 mr-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
        >
          Docs
        </a>
      </div>
      <div>
        <button type="button" class="btn" @click="$emit('logout')">登出</button>
        <!-- <a -->
        <!--   href="#" -->
        <!--   class="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0" -->
        <!--   >登出</a -->
        <!-- > -->
      </div>
    </div>
  </nav>
</template>

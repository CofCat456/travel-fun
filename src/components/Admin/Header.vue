<script setup>
import { useRoute, RouterLink } from 'vue-router';

import Logo from '../Logo.vue';

const headers = [
  {
    title: '首頁',
    key: 'AdminHome',
    icon: 'apps'
  },
  {
    title: '產品',
    key: 'AdminProducts',
    icon: 'shopping_bag'
  }
];

const route = useRoute();

const isActive = (key) => route.name === key;
</script>

<template>
  <nav class="flex h-full flex-col flex-wrap border-r p-6">
    <div class="bordr-b ml-4 mb-12 flex flex-shrink-0 items-center border-transparent text-white">
      <Logo dark />
    </div>
    <div class="flex flex-col gap-5">
      <p class="ml-6 text-cc-other-4/60">Menu</p>
      <ul class="text-sm-content mx-2">
        <li
          v-for="item in headers"
          :key="item.title"
          class="mb-4 rounded-m border-l-[3px] border-transparent p-2"
          :class="isActive(item.key) && 'border-cc-primary bg-cc-primary/10 text-cc-primary'"
        >
          <RouterLink class="flex items-center gap-3" :to="{ name: item.key }">
            <span class="material-icons-outlined"> {{ item.icon }} </span>
            {{ item.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <!-- <div class="block lg:hidden"> -->
    <!--   <button -->
    <!--     class="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white" -->
    <!--   > -->
    <!--     <svg class="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> -->
    <!--       <title>Menu</title> -->
    <!--       <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /> -->
    <!--     </svg> -->
    <!--   </button> -->
    <!-- </div> -->
    <!-- <div class="block w-full flex-grow lg:flex lg:w-auto lg:items-center"> -->
    <!--   <div class="text-sm lg:flex-grow"> -->
    <!--     <a -->
    <!--       href="#responsive-header" -->
    <!--       class="mt-4 mr-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block" -->
    <!--     > -->
    <!--       Docs -->
    <!--     </a> -->
    <!--   </div> -->
    <!--   <div> -->
    <!--     <button type="button" class="btn" @click="$emit('logout')">登出</button> -->
    <!--   </div> -->
    <!-- </div> -->
  </nav>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';

import { useUserStore } from '../../stores';
import Button from '../Base/Button.vue';
import Logo from '../Logo.vue';

const user = useUserStore();

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
        <li class="mb-4 rounded-m border-l-[3px] border-transparent p-2">
          <Button :is-loading="user.isLoading" @click="user.logout">登出</Button>
        </li>
      </ul>
    </div>
  </nav>
</template>

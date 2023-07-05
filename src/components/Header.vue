<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';

import Logo from './Logo.vue';
import FavouriteIcon from './Icons/FavouriteIcon.vue';
import ShopCartIcon from './Icons/ShopCartIcon.vue';
import HamburgerBtn from './HamburgerBtn.vue';
import Container from '../Layout/Container.vue';

import useUserStore from '../stores/user';

const route = useRoute();
const router = useRouter();

const user = useUserStore();

const goLogin = () => router.push({ name: 'Login' });
const goAdmin = () => router.push({ name: 'AdminHome' });

const isHome = computed(() => ['Home', 'City'].includes(route.name));
</script>

<template>
  <header
    class="top-0 z-20 flex h-16 justify-center bg-black/30 px-6 py-3 text-white backdrop-blur-[25px]"
    :class="isHome ? 'fixed left-0 right-0' : 'sticky'"
  >
    <Container>
      <div class="flex w-full justify-between">
        <HamburgerBtn />
        <div class="flex items-center gap-8 lg:w-[526px]">
          <RouterLink :to="{ name: 'Home' }">
            <Logo />
          </RouterLink>
          <ul class="hidden h-full flex-1 items-center gap-1 md:flex">
            <li class="h-full flex-1">
              <button type="button" class="h-full w-28 rounded-[100px] border border-white">
                選地區
              </button>
            </li>
            <li class="flex flex-1 items-center justify-center gap-2 text-sm">
              <span class="material-icons-outlined"> confirmation_number </span>
              景點套票
            </li>
            <li class="flex flex-1 items-center justify-center gap-2 text-sm">
              <span class="material-icons-outlined"> flight_takeoff </span>
              觀光行程
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-between lg:w-[256px]">
          <div class="hidden place-content-center md:grid">
            <FavouriteIcon />
          </div>
          <button
            v-if="user.loginStatus"
            type="button"
            class="hidden w-[144px] items-center justify-center gap-[6px] rounded-[50px] bg-cc-accent px-4 py-2 text-base lg:flex"
            @click="goAdmin()"
          >
            <span class="material-icons-outlined h-6 w-6"> person_filled </span>
            會員專區
          </button>
          <button
            v-else
            type="button"
            class="hidden w-[144px] items-center justify-center gap-[6px] rounded-[50px] bg-cc-other-8 px-4 py-2 text-base transition-colors duration-300 hover:bg-cc-accent lg:flex"
            @click="goLogin()"
          >
            <span class="material-icons-outlined h-6 w-6"> person_filled </span>
            登入 / 註冊
          </button>
          <ShopCartIcon />
        </div>
      </div>
    </Container>
  </header>
</template>

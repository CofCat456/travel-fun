<script setup>
import Logo from './Logo.vue';
import FavouriteIcon from './icons/FavouriteIcon.vue';
import ShopCartIcon from './icons/ShopCartIcon.vue';
import HamburgerBtn from './HamburgerBtn.vue';
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex justify-center bg-black/30 py-3 text-white backdrop-blur-[25px]"
  >
    <div class="flex w-full justify-between px-3 lg:max-w-[1296px] lg:px-2">
      <HamburgerBtn />
      <div class="flex items-center gap-8 lg:w-[526px]">
        <Logo />
        <ul class="hidden h-full flex-1 items-center gap-1 lg:flex">
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
        <div class="hidden place-content-center lg:grid">
          <FavouriteIcon />
        </div>
        <button
          type="button"
          class="hidden w-[144px] items-center justify-center gap-[6px] rounded-[50px] bg-cc-other-8 px-4 py-2 text-base transition-colors duration-300 hover:bg-cc-accent lg:flex"
        >
          <span class="material-icons-outlined h-6 w-6"> person_filled </span>
          登入 / 註冊
        </button>
        <ShopCartIcon />
      </div>
    </div>
  </header>
</template>

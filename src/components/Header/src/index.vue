<script setup lang="ts">
import {
  ConfirmationNumberOutlined,
  FavoriteBorderOutlined,
  FlightTakeoffOutlined,
  PersonOutlineFilled,
  PersonOutlineOutlined,
} from '@vicons/material';
import { NIcon } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import HamburgerBtn from '../../HamburgerBtn.vue';
import ShopCart from './shopCart.vue';
import { websiteConfig } from '@/config/website.config';
import { useUserStore } from '@/stores';
import Container from '@/layout/Container.vue';

const route = useRoute();

const userStore = useUserStore();

const { loginStatus } = storeToRefs(userStore);

const isFixed = computed(() => new Set(['Home', 'City', 'Country']).has(route.name!.toString()));
</script>

<template>
  <header
    class="top-0 z-20 flex h-16 justify-center bg-black/30 px-6 py-3 text-white backdrop-blur-[25px]"
    :class="isFixed ? 'fixed left-0 right-0' : 'sticky'"
  >
    <Container>
      <div class="flex w-full justify-between">
        <HamburgerBtn />
        <div class="flex items-center gap-8 lg:w-[526px]">
          <RouterLink :to="{ name: 'Home' }">
            <img class="h-10 object-cover" :src="websiteConfig.logoImage" alt="logo">
          </RouterLink>
          <ul class="hidden h-full flex-1 items-center gap-1 md:flex">
            <li class="h-full flex-1">
              <button type="button" class="h-full w-28 rounded-[100px] border border-white">
                選地區
              </button>
            </li>
            <li class="flex flex-1 items-center justify-center gap-2 text-sm">
              <NIcon size="24">
                <ConfirmationNumberOutlined />
              </NIcon>
              景點套票
            </li>
            <li class="flex flex-1 items-center justify-center gap-2 text-sm">
              <NIcon size="24">
                <FlightTakeoffOutlined />
              </NIcon>
              觀光行程
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-between lg:w-[256px]">
          <div class="hidden place-content-center md:grid">
            <NIcon size="24" class="icon-hover">
              <FavoriteBorderOutlined />
            </NIcon>
          </div>
          <RouterLink v-if="loginStatus" v-slot="{ navigate }" custom :to="{ name: 'AdminHome' }">
            <button
              type="button"
              class="hidden w-[144px] items-center justify-center gap-[6px] rounded-[50px] bg-cc-accent px-4 py-2 text-base lg:flex"
              @click="navigate"
            >
              <NIcon size="24">
                <PersonOutlineOutlined />
              </NIcon>
              會員專區
            </button>
          </RouterLink>
          <RouterLink v-else v-slot="{ navigate }" custom :to="{ name: 'Login' }">
            <button
              type="button"
              class="hidden w-[144px] items-center justify-center gap-[6px] rounded-[50px] bg-cc-other-8 px-4 py-2 text-base transition-colors duration-300 hover:bg-cc-accent lg:flex"
              @click="navigate"
            >
              <NIcon size="24">
                <PersonOutlineFilled />
              </NIcon>
              登入 / 註冊
            </button>
          </RouterLink>
          <ShopCart />
        </div>
      </div>
    </Container>
  </header>
</template>
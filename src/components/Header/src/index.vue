<script setup lang="ts">
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  PersonOutlineFilled,
  PersonOutlineOutlined,
} from '@vicons/material';
import { NIcon } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import ShopCart from './ShopCart.vue';
import { navList } from './navList.ts';
import { HamburgerMenu } from './Hamburger';
import { websiteConfig } from '@/config/website.config';
import { useCartStore, useDeviceStore, useFavoriteStore, useUserStore } from '@/stores';
import Container from '@/layout/Container.vue';

const route = useRoute();

const cartStore = useCartStore();
const deviceStore = useDeviceStore();
const favoriteStore = useFavoriteStore();
const userStore = useUserStore();

const { totalNum, cartList } = storeToRefs(cartStore);
const { isMobile } = storeToRefs(deviceStore);
const { favoriteList } = storeToRefs(favoriteStore);
const { loginStatus } = storeToRefs(userStore);

const cartRef = ref<InstanceType<typeof ShopCart>>();
const hamBurRef = ref<InstanceType<typeof HamburgerMenu>>();

const isFixed = computed(() => new Set(['Home', 'City', 'Country']).has(route.name!.toString()));

const navListComponent = computed(() => navList.filter(({ component }) => component));

function handleClick(target: string) {
  if (target === 'cart')
    hamBurRef.value?.closeActive();

  cartRef.value?.closeActive();
};
</script>

<template>
  <header
    id="header"
    class="top-0 z-20 flex h-16 justify-center bg-black/30 px-6 py-3 text-white backdrop-blur-[25px]"
    :class="isFixed ? 'fixed left-0 right-0' : 'sticky'"
  >
    <Container>
      <div class="flex w-full justify-between">
        <HamburgerMenu ref="hamBurRef" :is-mobile="isMobile" @active="handleClick" />
        <div class="flex items-center gap-8 lg:w-[526px]">
          <RouterLink :to="{ name: 'Home' }">
            <img class="h-10 object-cover" :src="websiteConfig.logoImage" alt="logo">
          </RouterLink>
          <ul class="hidden h-full flex-1 items-center gap-1 md:flex">
            <template v-for="nav in navListComponent" :key="nav.id">
              <li class="flex-1 text-center text-sm">
                <component :is="nav.component" />
              </li>
            </template>
          </ul>
        </div>
        <div class="flex items-center justify-between lg:w-[256px]">
          <div class="hidden place-content-center md:grid">
            <RouterLink class="leading-none" :to="{ name: 'WishList' }">
              <NIcon v-if="favoriteList.length !== 0" size="24" color="#EE5220" class="icon-hover">
                <FavoriteOutlined />
              </NIcon>
              <NIcon v-else class="icon-hover" size="24">
                <FavoriteBorderOutlined />
              </NIcon>
            </RouterLink>
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
          <ShopCart
            ref="cartRef"
            :is-mobile="isMobile"
            :total-num="totalNum"
            :cart-list="cartList"
            @active="handleClick"
          />
        </div>
      </div>
    </Container>
  </header>
</template>

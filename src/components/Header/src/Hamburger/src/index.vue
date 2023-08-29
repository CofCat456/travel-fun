<script setup lang="ts">
import {
  KeyboardArrowRightRound,
} from '@vicons/material';
import type { DrawerPlacement } from 'naive-ui';
import { NCollapse, NCollapseItem, NDrawer, NIcon } from 'naive-ui';
import { reactive } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { handleItemHeaderClick, navList } from '../../navList.ts';
import HamburgerBtn from './Btn.vue';

interface DrawerActive {
  active: boolean
  placement: DrawerPlacement
}

const activate: DrawerActive = reactive({
  active: false,
  placement: 'bottom',
});

const toggleActive = () => activate.active = !activate.active;

onBeforeRouteUpdate(() => {
  activate.active = false;
});
</script>

<template>
  <HamburgerBtn @click="toggleActive" />
  <NDrawer
    id="drawer"
    v-model:show="activate.active"
    style="top: 64px"
    show-mask="transparent"
    height="undefined"
    :placement="activate.placement"
  >
    <NCollapse arrow-placement="right" accordion @item-header-click="handleItemHeaderClick">
      <template #arrow>
        <NIcon size="24">
          <KeyboardArrowRightRound />
        </NIcon>
      </template>

      <template v-for="nav in navList" :key="nav.id">
        <component :is="nav.mobileComponent" />
      </template>

      <NCollapseItem name="user">
        <template #header>
          <div class="flex-1">
            會員專區
          </div>
        </template>
        <RouterLink v-slot="{ navigate }" :to="{ name: 'Login' }" custom>
          <div @click="navigate">
            登入/註冊
          </div>
        </RouterLink>
        <RouterLink v-slot="{ navigate }" :to="{ name: 'WishList' }" custom>
          <div @click="navigate">
            我的最愛
          </div>
        </RouterLink>
      </NCollapseItem>
    </NCollapse>
  </NDrawer>
</template>

<style scoped>
:global(.n-collapse .n-collapse-item) {
  margin-top: 0;
}

:global(.n-collapse .n-collapse-item .n-collapse-item__header) {
  padding: 0;
}

:global(.n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main) {
  padding: 16px;
  background-color: #E9E9E9;
  font-weight: 700;
}

:global(.n-collapse .n-collapse-item .n-collapse-item__header.n-collapse-item__header--active > .n-collapse-item__header-main),
:global(.n-collapse .n-collapse-item .n-collapse-item__header.n-collapse-item__header--active .n-collapse-item-arrow)
{
  @apply text-cc-accent
}

:global(.n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner) {
  padding-top: 0;
}

:global(.n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner > div) {
  @apply px-4 py-3 bg-cc-other-7 border-t border-cc-other-1 cursor-pointer
}
</style>

<script setup lang="ts">
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GithubOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
} from '@vicons/antd';
import { NAvatar, NBreadcrumb, NBreadcrumbItem, NDropdown, NIcon, NTooltip } from 'naive-ui';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useUserStore } from '../../stores';
import { websiteConfig } from '@/config/website.config';

defineProps<{
  collapsed: boolean
}>();

defineEmits<{
  (e: 'update:collapsed'): void
}>();

const route = useRoute();
const router = useRouter();

const user = useUserStore();

const isFullscreen = ref(false);

function generator(routerList: Array<any>) {
  return routerList.map((item) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === '/',
    };
    // 是否有子菜單，並遞迴處理
    if (item.children && item.children.length > 0)
      currentMenu.children = generator(item.children);

    return currentMenu;
  });
}

/** [TODO:env] */
const iconList = [
  {
    icon: GithubOutlined,
    tips: 'github',
    eventObject: {
      click: () => window.open('https://github.com/CofCat456/travel-fun'),
    },
  },
  {
    icon: GlobalOutlined,
    tips: 'website',
    eventObject: {
      click: () => window.open('https://cofcat.com'),
    },
  },
];

const avatarOptions = [
  {
    label: '登出',
    key: 1,
  },
];

const getBreadcrumbList = computed(() => generator(route.matched));

const reloadPage = () => router.go(0);

function toggleFullScreen() {
  if (!document.fullscreenElement)
    document.documentElement.requestFullscreen();
  else if (document.exitFullscreen)
    document.exitFullscreen();
}

function dropdownSelect(key: string) {
  router.push({ name: key });
}

async function avatarSelect() {
  await user.logout();
}
</script>

<template>
  <div class="flex h-16 items-center justify-between rounded-b-xl px-4 shadow transition-all">
    <!-- 左側菜單 -->
    <div class="flex items-center">
      <!-- 左邊側邊欄開關 -->
      <div class="layout-header-trigger" @click="$emit('update:collapsed', !collapsed)">
        <NIcon v-if="collapsed" size="18">
          <MenuUnfoldOutlined />
        </NIcon>
        <NIcon v-else size="18">
          <MenuFoldOutlined />
        </NIcon>
      </div>
      <!-- 刷新頁面 -->
      <div class="layout-header-trigger mr-1" @click="reloadPage">
        <NIcon size="18">
          <ReloadOutlined />
        </NIcon>
      </div>
      <!-- 麵包屑 -->
      <NBreadcrumb>
        <template
          v-for="routeItem in getBreadcrumbList"
          :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name"
        >
          <NBreadcrumbItem v-if="routeItem.meta.title">
            <NDropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span>
                {{ routeItem.meta.title }}
              </span>
            </NDropdown>
            <span v-else>
              {{ routeItem.meta.title }}
            </span>
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
    </div>
    <!-- 右側菜單 -->
    <div class="flex items-center">
      <div v-for="item in iconList" :key="item.tips" class="layout-header-trigger">
        <NTooltip placement="bottom">
          <template #trigger>
            <NIcon size="18">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </NIcon>
          </template>
          <span>{{ item.tips }}</span>
        </NTooltip>
      </div>
      <!-- 切换全螢幕 -->
      <div class="layout-header-trigger">
        <NTooltip placement="bottom">
          <template #trigger>
            <NIcon size="18" @click="toggleFullScreen">
              <FullscreenOutlined v-if="isFullscreen" />
              <FullscreenExitOutlined v-else />
            </NIcon>
          </template>
          <span>全螢幕</span>
        </NTooltip>
      </div>
      <!-- 個人 -->
      <div class="flex items-center">
        <NDropdown trigger="hover" :options="avatarOptions" @select="avatarSelect">
          <div class="avatar">
            <NAvatar round lazy :src="websiteConfig.userImage" />
          </div>
        </NDropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-header-trigger {
  @apply inline-block cursor-pointer px-3 text-center;
}
</style>

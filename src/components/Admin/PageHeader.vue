<script setup>
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GithubOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined
} from '@vicons/antd';
import { NAvatar, NBreadcrumb, NBreadcrumbItem, NDropdown, NIcon, NTooltip } from 'naive-ui';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { websiteConfig } from '@/config/website.config';

import { useUserStore } from '../../stores';

defineProps({
  collapsed: Boolean
});

defineEmits(['update:collapsed']);

const route = useRoute();
const router = useRouter();

const user = useUserStore();

const isFullscreen = ref(false);

const generator = (routerList) => {
  return routerList.map((item) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === '/'
    };
    // 是否有子菜單，並遞迴處理
    if (item.children && item.children.length > 0) {
      currentMenu.children = generator(item.children, currentMenu);
    }
    return currentMenu;
  });
};

const iconList = [
  {
    icon: GithubOutlined,
    tips: 'github',
    eventObject: {
      click: () => window.open('https://github.com/CofCat456/travel-fun')
    }
  },
  {
    icon: GlobalOutlined,
    tips: 'website',
    eventObject: {
      click: () => window.open('https://cofcat.com')
    }
  }
];

const avatarOptions = [
  {
    label: '登出',
    key: 1
  }
];

const getBreadcrumbList = computed(() => generator(route.matched));

const reloadPage = () => router.go(0);

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

const dropdownSelect = (key) => {
  router.push({ name: key });
};

const avatarSelect = async () => {
  await user.logout();
};
</script>

<template>
  <div class="flex h-16 items-center justify-between rounded-b-xl px-4 shadow transition-all">
    <!-- 左側菜單 -->
    <div class="flex items-center">
      <!-- 左邊側邊欄開關 -->
      <div class="layout-header-trigger" @click="$emit('update:collapsed', !collapsed)">
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新頁面 -->
      <div class="layout-header-trigger mr-1" @click="reloadPage">
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 麵包屑 -->
      <n-breadcrumb>
        <template
          v-for="routeItem in getBreadcrumbList"
          :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name"
        >
          <n-breadcrumb-item v-if="routeItem.meta.title">
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span>
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span v-else>
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <!-- 右側菜單 -->
    <div class="flex items-center">
      <div class="layout-header-trigger" v-for="item in iconList" :key="item.icon">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div>
      <!-- 切换全螢幕 -->
      <div class="layout-header-trigger">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18" @click="toggleFullScreen">
              <FullscreenOutlined v-if="isFullscreen" />
              <FullscreenExitOutlined v-else />
            </n-icon>
          </template>
          <span>全螢幕</span>
        </n-tooltip>
      </div>
      <!-- 個人 -->
      <div class="flex items-center">
        <n-dropdown trigger="hover" :options="avatarOptions" @select="avatarSelect">
          <div class="avatar">
            <n-avatar round lazy :src="websiteConfig.userImage" />
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-header-trigger {
  @apply inline-block cursor-pointer px-3 text-center;
}
</style>

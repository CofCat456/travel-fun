<script setup>
import {
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMessageProvider
} from 'naive-ui';
import { onMounted, provide, ref } from 'vue';

import AsideMenu from '../components/Admin/AsideMenu.vue';
import Logo from '../components/Admin/Logo.vue';
import MainView from '../components/Admin/MainView.vue';
import PageHeader from '../components/Admin/PageHeader.vue';
import Loading from '../components/Loading.vue';
import { useUserStore } from '../stores';

const user = useUserStore();

const loadingRef = ref(null);
const collapsed = ref(false);

const themeOverrides = {
  common: {
    primaryColor: '#0F4BB4',
    primaryColorHover: '#68A0E8',
    primaryColorPressed: '#072A81',
    primaryColorSuppl: '#CDE4FB',
    borderRadius: '5px'
  },
  Card: {
    borderRadius: '12px'
  }
};

provide('loading', loadingRef);

onMounted(() => {
  user.checkSignin(loadingRef);
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-layout class="min-h-screen" has-sider>
        <n-layout-sider
          class="min-h-screen"
          bordered
          show-trigger="bar"
          collapse-mode="width"
          :width="200"
          :collapsed-width="64"
          :native-scrollbar="false"
          :collapsed="collapsed"
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <Logo :collapsed="collapsed" />
          <AsideMenu />
        </n-layout-sider>
        <n-layout>
          <n-layout-header>
            <PageHeader v-model:collapsed="collapsed" />
          </n-layout-header>
          <n-layout-content class="min-h-screen bg-cc-other-7/30 px-3 py-2">
            <MainView v-if="user.loginStatus" />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
  <Loading ref="loadingRef" />
</template>

<style scoped>
:deep(.n-icon) {
  @apply flex cursor-pointer items-center hover:text-cc-primary;
}
</style>

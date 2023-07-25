<script setup>
import {
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMessageProvider,
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
    borderRadius: '5px',
    borderColor: '#D4D4D4',
    textColorBase: '#181818',
    textColor1: '#181818',
    textColor2: '#181818',
    textColor3: '#181818',
  },
  Card: {
    borderRadius: '12px',
  },
  Rate: {
    itemColorActive: '#EE5220',
  },
};

provide('loading', loadingRef);

onMounted(() => {
  user.checkSignin(loadingRef);
});
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NLayout has-sider>
        <NLayoutSider
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
        </NLayoutSider>
        <NLayout embedded class="px-3">
          <NLayoutHeader>
            <PageHeader v-model:collapsed="collapsed" />
          </NLayoutHeader>
          <NLayoutContent embedded class="min-h-screen py-2">
            <MainView v-if="user.loginStatus" />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </NMessageProvider>
  </NConfigProvider>
  <Loading ref="loadingRef" />
</template>

<style scoped>
:deep(.n-icon) {
  @apply flex cursor-pointer items-center hover:text-cc-primary;
}
</style>

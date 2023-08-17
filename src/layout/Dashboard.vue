<script setup lang="ts">
import {
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
} from 'naive-ui';
import { ref } from 'vue';

import AsideMenu from '../components/Admin/AsideMenu.vue';
import Logo from '../components/Admin/Logo.vue';
import MainView from '../components/Admin/MainView.vue';
import PageHeader from '../components/Admin/PageHeader.vue';

const collapsed = ref(false);
</script>

<template>
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
      <NLayoutContent embedded class="py-2">
        <MainView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<style scoped>
:deep(.n-icon) {
  @apply flex cursor-pointer items-center hover:text-cc-primary;
}
</style>

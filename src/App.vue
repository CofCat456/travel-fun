<script setup lang="ts">
import {
  NConfigProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
} from 'naive-ui';
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

const getThemeOverrides = computed(() => {
  const isAdmin = !!route.meta.requiresAuth;

  const adminCardOverrides = {
    borderRadius: '12px',
  };

  return {
    common: {
      primaryColor: '#0F4BB4',
      primaryColorHover: '#68A0E8',
      primaryColorPressed: '#072A81',
      primaryColorSuppl: '#CDE4FB',
      borderRadius: '5px',
      textColorBase: '#181818',
      textColor1: '#181818',
      textColor2: '#181818',
      textColor3: '#181818',
    },
    Breadcrumb: {
      itemTextColor: '#0F4BB4',
      itemTextColorHover: '#0F4BB4',
      itemTextColorPressed: '#EE5220',
      itemColorHover: '#CDE4FB',
    },
    Rate: {
      itemColorActive: '#EE5220',
    },
    Card: isAdmin ? adminCardOverrides : {},
  };
});
</script>

<template>
  <NConfigProvider :theme-overrides="getThemeOverrides">
    <NLoadingBarProvider>
      <NMessageProvider>
        <NDialogProvider>
          <RouterView />
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

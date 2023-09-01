<script setup lang="ts">
import {
  KeyboardArrowRightRound,
} from '@vicons/material';
import { NCollapse, NCollapseItem, NDrawer, NIcon } from 'naive-ui';
import { reactive } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { handleItemHeaderClick, navList } from '../../navList.ts';
import HamburgerBtn from './Btn.vue';
import type { DrawerActive } from '@/types';

defineProps<{
  isMobile: boolean
}>();

const emit = defineEmits<{
  (e: 'active', target: string): void
}>();

const activate: DrawerActive = reactive({
  active: false,
  placement: 'bottom',
});

function toggleActive() {
  if (!activate.active)
    emit('active', 'humburger');

  activate.active = !activate.active;
};

const closeActive = () => activate.active = false;

onBeforeRouteUpdate(() => {
  closeActive();
});

defineExpose({
  closeActive,
});
</script>

<template>
  <template v-if="isMobile">
    <HamburgerBtn @click="toggleActive" />
    <NDrawer
      v-model:show="activate.active"
      style="top: 64px"
      height="undefined"
      :show-mask="false"
      :mask-closable="false"
      :placement="activate.placement"
    >
      <NCollapse
        :theme-overrides="{
          itemMargin: '0',
          titlePadding: '0',
        }"
        accordion
        arrow-placement="right"
        @item-header-click="handleItemHeaderClick
        "
      >
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
</template>

<style scoped>
:deep(.n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner) {
  padding-top: 0;
}

:deep(.n-collapse-item__header-main) {
  padding: 16px;
  background-color: #E9E9E9;
  font-weight: 700;
}

:deep(.n-collapse-item__header.n-collapse-item__header--active > .n-collapse-item__header-main),
:deep(.n-collapse-item__header.n-collapse-item__header--active .n-collapse-item-arrow)
{
  @apply text-cc-accent
}

:deep(.n-collapse-item__content-inner > div) {
  @apply px-4 py-3 bg-cc-other-7 border-t border-cc-other-1 cursor-pointer
}
</style>

<script setup>
import { TableOutlined as TableIcon } from '@vicons/antd';
import { SpeedometerOutline as SpeedometerIcon } from '@vicons/ionicons5';
import { NIcon, NMenu } from 'naive-ui';
import { h } from 'vue';
import { RouterLink } from 'vue-router';

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const menuOptions = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(SpeedometerIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'AdminHome'
              }
            },
            { default: () => '主控台' }
          ),
        key: 'home'
      }
    ]
  },
  {
    label: '列表',
    key: 'table',
    icon: renderIcon(TableIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'AdminProducts'
              }
            },
            { default: () => '產品列表' }
          ),
        key: 'products'
      }
    ]
  }
];
</script>

<template>
  <n-menu :collapsed-width="64" :collapsed-icon-size="20" :indent="24" :options="menuOptions" />
</template>

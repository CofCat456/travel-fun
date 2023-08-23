<script setup lang="ts">
import { DashboardOutlined, TableOutlined } from '@vicons/antd';
import type { Component } from 'vue';
import { NIcon, NMenu } from 'naive-ui';
import { h } from 'vue';
import { RouterLink } from 'vue-router';

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(DashboardOutlined),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'AdminHome',
              },
            },
            { default: () => '主控台' },
          ),
        key: 'home',
      },
    ],
  },
  {
    label: '列表',
    key: 'table',
    icon: renderIcon(TableOutlined),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'AdminProducts',
              },
            },
            { default: () => '產品列表' },
          ),
        key: 'products',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'AdminShopCarts',
              },
            },
            { default: () => '購物車列表' },
          ),
        key: 'shopCarts',
      },
    ],
  },
];
</script>

<template>
  <NMenu :collapsed-width="64" :collapsed-icon-size="20" :indent="24" :options="menuOptions" />
</template>

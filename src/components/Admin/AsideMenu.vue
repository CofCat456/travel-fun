<script setup lang="ts">
import { DashboardOutlined, TableOutlined } from '@vicons/antd';
import type { Component } from 'vue';
import { NIcon, NMenu } from 'naive-ui';
import { h } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

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
        key: 'AdminProducts',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'AdminOrders',
              },
            },
            { default: () => '訂單列表' },
          ),
        key: 'AdminOrders',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'AdminCoupons',
              },
            },
            { default: () => '優惠卷列表' },
          ),
        key: 'AdminCoupons',
      },
    ],
  },
];
</script>

<template>
  <NMenu
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :options="menuOptions"
    :default-value="route.name!.toString()"
  />
</template>

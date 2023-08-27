<script setup lang="ts">
import { NButton, NCard, NIcon, useDialog } from 'naive-ui';
import { computed, h, onMounted, reactive, ref } from 'vue';

import { DeleteSweepOutlined } from '@vicons/material';
import { columns } from './columns';
import OrderModal from './components/OrderModal.vue';
import { BasicTable, TableAction } from '@/components/Admin/Table';
import {
  apiAdminDelOrder,
  apiAdminDelOrders,
  apiAdminGetOrders,
  apiAdminPutOrder,
} from '@/utils/api';
import type { Order } from '@/types';
import { currency, formatUnix2YMD } from '@/utils/global';

const dialog = useDialog();

const isTableLoading = ref(false);
const isLoading = ref(false);
const orders = ref<Order[]>([]);
const tempOrder: Order = reactive({
  create_at: 0,
  id: '',
  is_paid: false,
  message: '',
  num: 0,
  products: {},
  total: 0,
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
});
const showModal = ref(false);

const getTableData = computed(() =>
  [...orders.value].map(order => ({
    ...order,
    create_at: formatUnix2YMD(order.create_at!),
    total: currency(order.total!),
  })),
);

async function getOrders() {
  isTableLoading.value = true;

  try {
    const res = await apiAdminGetOrders();

    const {
      data: { success },
    } = res;

    if (success)
      orders.value = res.data.orders;
  }
  finally {
    isTableLoading.value = false;
  }
}

async function updateOrder(order: Order) {
  isLoading.value = true;

  const {
    id,
  } = order;

  const data = {
    data: { ...order },
  };

  try {
    const res = await apiAdminPutOrder(id!, data);

    const {
      data: { success },
    } = res;

    if (success) {
      closeOrderModal();
      getOrders();
    }
  }
  finally {
    isLoading.value = false;
  }
}

async function delOrder(id: string) {
  const res = await apiAdminDelOrder(id);

  const {
    data: { success },
  } = res;

  if (success)
    getOrders();
}

async function delOrders() {
  const res = await apiAdminDelOrders();

  const {
    data: { success },
  } = res;

  if (success)
    getOrders();
}

function openOrderModal(order: Order = {
  create_at: Date.now(),
  id: '',
  is_paid: false,
  message: '',
  num: 0,
  products: {},
  total: 0,
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
}) {
  showModal.value = true;
  Object.assign(tempOrder, { ...order });
}

function closeOrderModal() {
  showModal.value = false;
}

function openDelModal(id: string) {
  const d = dialog.warning({
    title: '警告',
    content: `您確定刪除編號 ${id} 訂單？`,
    positiveText: '確定',
    negativeText: '再想想',
    onPositiveClick: async () => {
      try {
        d.loading = true;
        await delOrder(id);
      }
      finally {
        d.loading = false;
        d.destroy();
      }
    },
  });
}

function openDelAllModal() {
  const d = dialog.warning({
    title: '警告',
    content: '您確定刪除所有訂單嗎？',
    positiveText: '確定',
    negativeText: '再想想',
    onPositiveClick: async () => {
      try {
        d.loading = true;
        await delOrders();
      }
      finally {
        d.loading = false;
        d.destroy();
      }
    },
  });
}

const getActionColumn = computed(() => ({
  width: 40,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(row: any) {
    const order = orders.value.find(item => item.id === row.id) as Order;

    return h(TableAction, {
      style: 'button',
      actions: [
        {
          label: '编辑',
          onClick: () => openOrderModal(order),
        },
        {
          label: '删除',
          onClick: () => openDelModal(row.id),
        },
      ],
    });
  },
}));

onMounted(() => {
  getOrders();
});
</script>

<template>
  <NCard bordered>
    <BasicTable
      :loading="isTableLoading"
      :columns="columns"
      :action-column="getActionColumn"
      :data="getTableData"
      @reload="getOrders"
    >
      <template #tableTitle>
        <NButton @click="openDelAllModal">
          <template #icon>
            <NIcon>
              <DeleteSweepOutlined />
            </NIcon>
          </template>
          清空訂單
        </NButton>
      </template>
    </BasicTable>
    <OrderModal
      v-model:showModal="showModal"
      :is-loading="isLoading"
      :temp-order="tempOrder"
      @update-order="updateOrder"
    />
  </NCard>
</template>

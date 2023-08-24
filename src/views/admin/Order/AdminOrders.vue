<script setup lang="ts">
import { NCard } from 'naive-ui';
import Swal from 'sweetalert2';
import { computed, h, onMounted, reactive, ref } from 'vue';

import { columns } from './columns';
import OrderModal from './components/OrderModal.vue';
import { BasicTable, TableAction } from '@/components/Admin/Table';
import {
  apiAdminDeleteOrder,
  apiAdminGetOrders, apiAdminPutOrder,
} from '@/utils/api';
import type { Order } from '@/types';
import { currency, formatDate2YMD } from '@/utils/global';

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
    create_at: formatDate2YMD(order.create_at!),
    total: currency(order.total!, 'NT$ '),
  })),
);

function openOrderModal(order = {}) {
  showModal.value = true;
  Object.assign(tempOrder, { ...order });
}

function closeOrderModal() {
  showModal.value = false;
}

async function getOrders() {
  isTableLoading.value = true;

  try {
    const res = await apiAdminGetOrders();

    const {
      data: { success },
    } = res;

    // eslint-disable-next-line no-console
    console.log(res);

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

async function deleteOrder(id: string) {
  const res = await apiAdminDeleteOrder(id);

  const {
    data: { success },
  } = res;

  if (success)
    getOrders();
}

function openDeleteModal(id: string) {
  Swal.fire({
    title: '刪除產品',
    text: `您正在刪除編號 ${id} 訂單`,
    icon: 'warning',
    showLoaderOnConfirm: true,
    showCancelButton: true,
    confirmButtonColor: '#0F4BB4',
    cancelButtonColor: '#d33',
    confirmButtonText: '確定刪除',
    cancelButtonText: '取消',
    preConfirm: () => deleteOrder(id),
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
          onClick: () => openDeleteModal(row.id),
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
    />
    <OrderModal
      v-model:showModal="showModal"
      :is-loading="isLoading"
      :temp-order="tempOrder"
      @update-order="updateOrder"
    />
  </NCard>
</template>

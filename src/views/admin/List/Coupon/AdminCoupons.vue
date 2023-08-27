<script setup lang="ts">
import { NButton, NCard, NIcon, useDialog } from 'naive-ui';
import { computed, h, onMounted, reactive, ref } from 'vue';

import { PlusOutlined } from '@vicons/material';
import { columns } from './columns';
import CouponModal from './components/CouponModal.vue';
import { BasicTable, TableAction } from '@/components/Admin/Table';
import {
  apiAdminDelCoupon, apiAdminGetCoupons,
  apiAdminPostCoupon,
  apiAdminPutCoupon,
} from '@/utils/api';
import type { Coupon } from '@/types';

const dialog = useDialog();

const isTableLoading = ref(false);
const isLoading = ref(false);
const isNew = ref(true);
const coupons = ref<Coupon[]>([]);
const tempCoupon: Coupon = reactive({
  code: '',
  due_date: 0,
  id: '',
  is_enabled: 0,
  num: 0,
  percent: 0,
  title: '',
});
const showModal = ref(false);

const getTableData = computed(() =>
  [...coupons.value].map(coupon => ({
    ...coupon,
    // create_at: formatDate2YMD(order.create_at!),
    // total: currency(order.total!, 'NT$ '),
  })),
);

async function getCoupons() {
  isTableLoading.value = true;

  try {
    const res = await apiAdminGetCoupons();

    const {
      data: { success },
    } = res;

    if (success)
      coupons.value = res.data.coupons;
  }
  finally {
    isTableLoading.value = false;
  }
}

async function addCoupon(coupon: Coupon) {
  isLoading.value = true;

  const data = {
    data: { ...coupon },
  };

  try {
    const res = await apiAdminPostCoupon(data);

    const {
      data: { success },
    } = res;

    if (success) {
      closeCouponModal();
      getCoupons();
    }
  }
  finally {
    isLoading.value = false;
  }
}

async function updateCoupon(coupon: Coupon) {
  isLoading.value = true;

  const {
    id,
  } = coupon;

  const data = {
    data: { ...coupon },
  };

  try {
    const res = await apiAdminPutCoupon(id!, data);

    const {
      data: { success },
    } = res;

    if (success) {
      closeCouponModal();
      getCoupons();
    }
  }
  finally {
    isLoading.value = false;
  }
}

async function delCoupon(id: string) {
  const res = await apiAdminDelCoupon(id);

  const {
    data: { success },
  } = res;

  if (success)
    getCoupons();
}

function openCouponModal(status: boolean, coupon: Coupon = {
  code: '',
  due_date: Date.now(),
  id: '',
  is_enabled: 0,
  num: 0,
  percent: 0,
  title: '',
}) {
  showModal.value = true;
  isNew.value = status;
  Object.assign(tempCoupon, { ...coupon });
}

function closeCouponModal() {
  showModal.value = false;
}

function openDelModal(id: string, title: string) {
  const d = dialog.warning({
    title: '警告',
    content: `您確定刪除 ${title} 優惠卷？`,
    positiveText: '確定',
    negativeText: '再想想',
    onPositiveClick: async () => {
      try {
        d.loading = true;
        await delCoupon(id);
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
    const coupon = coupons.value.find(item => item.id === row.id) as Coupon;

    return h(TableAction, {
      style: 'button',
      actions: [
        {
          label: '编辑',
          onClick: () => openCouponModal(false, coupon),
        },
        {
          label: '删除',
          onClick: () => openDelModal(row.id, row.title),
        },
      ],
    });
  },
}));

onMounted(() => {
  getCoupons();
});
</script>

<template>
  <NCard bordered>
    <BasicTable
      :loading="isTableLoading"
      :columns="columns"
      :action-column="getActionColumn"
      :data="getTableData"
      @reload="getCoupons"
    >
      <template #tableTitle>
        <NButton @click="openCouponModal(true)">
          <template #icon>
            <NIcon>
              <PlusOutlined />
            </NIcon>
          </template>
          新增
        </NButton>
      </template>
    </BasicTable>
    <CouponModal
      v-model:showModal="showModal"
      :is-new="isNew"
      :is-loading="isLoading"
      :temp-coupon="tempCoupon"
      @add-coupon="addCoupon"
      @update-coupon="updateCoupon"
    />
  </NCard>
</template>

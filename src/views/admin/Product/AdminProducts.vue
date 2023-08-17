<script setup lang="ts">
import { PlusOutlined } from '@vicons/antd';
import { NButton, NCard, NIcon } from 'naive-ui';
import Swal from 'sweetalert2';
import { computed, h, onMounted, reactive, ref } from 'vue';

import { columns } from './columns';
import ProductModal from './components/ProductModal.vue';
import { BasicTable, TableAction } from '@/components/Admin/Table';
import {
  apiAdminDeleteProducts,
  apiAdminGetAllProducts,
  apiAdminPostProducts,
  apiAdminPutProducts,
} from '@/utlis/api';
import { categoryMap, cityMap } from '@/utlis/context';
import { currency, formatDate2YMD } from '@/utlis/global';
import type { Product } from '@/types';

const isTableLoading = ref(false);
const isLoading = ref(false);
const isNew = ref(true);
const products = ref<Product[]>([]);
const tempProduct: Product = reactive({
  id: '',
  title: '',
  city: '',
  address: '',
  category: '',
  unit: '',
  evaluate: 0,
  evaluateNum: 0,
  origin_price: 0,
  price: 0,
  date: Date.now(),
  description: '',
  is_enabled: false,
  imageUrl: '',
  imagesUrl: [],
  features: '',
  plans: [],
  content: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
});
const showModal = ref(false);

const getTableData = computed(() =>
  [...products.value].map(product => ({
    ...product,
    category: categoryMap.get(product.category),
    city: cityMap.get(product.city),
    origin_price: currency(product.origin_price),
    price: currency(product.price),
    date: formatDate2YMD(product.date),
  })),
);

function openProductModal(status: boolean, product = {}) {
  showModal.value = true;
  isNew.value = status;
  Object.assign(tempProduct, { ...product });
}

function closeProductModal() {
  showModal.value = false;
}

async function getProducts() {
  isTableLoading.value = true;

  try {
    const res = await apiAdminGetAllProducts();

    const {
      data: { success },
    } = res;

    if (success)
      products.value = Object.values(res.data.products);
  }
  finally {
    isTableLoading.value = false;
  }
}

async function addProduct(product: Product) {
  isLoading.value = true;

  const data = {
    data: { ...product },
  };

  try {
    const res = await apiAdminPostProducts(data);

    const {
      data: { success },
    } = res;

    if (success) {
      closeProductModal();
      getProducts();
    }
  }
  finally {
    isLoading.value = false;
  }
}

async function updateProduct(product: Product) {
  isLoading.value = true;

  const {
    id,
  } = product;

  const data = {
    data: { ...product },
  };

  try {
    const res = await apiAdminPutProducts(id, data);

    const {
      data: { success },
    } = res;

    if (success) {
      closeProductModal();
      getProducts();
    }
  }
  finally {
    isLoading.value = false;
  }
}

async function updateEnabled(product: Product) {
  isTableLoading.value = true;

  const {
    id,
  } = product;

  const data = {
    data: { ...product },
  };

  try {
    const res = await apiAdminPutProducts(id, data);

    const {
      data: { success },
    } = res;

    if (success)
      getProducts();
  }
  finally {
    isTableLoading.value = false;
  }
}

async function deleteProduct(id: string) {
  const res = await apiAdminDeleteProducts(id);

  const {
    data: { success },
  } = res;

  if (success)
    getProducts();
}

function openDeleteModal(id: string, title: string) {
  Swal.fire({
    title: '刪除產品',
    text: `您正在刪除 ${title} 產品`,
    icon: 'warning',
    showLoaderOnConfirm: true,
    showCancelButton: true,
    confirmButtonColor: '#0F4BB4',
    cancelButtonColor: '#d33',
    confirmButtonText: '確定刪除',
    cancelButtonText: '取消',
    preConfirm: () => deleteProduct(id),
  });
}

const getActionColumn = computed(() => ({
  width: 120,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(row: any) {
    const product = products.value.find(item => item.id === row.id) as Product;

    return h(TableAction, {
      style: 'button',
      actions: [
        {
          label: '编辑',
          onClick: () => openProductModal(false, product),
        },
        {
          label: '删除',
          onClick: () => openDeleteModal(row.id, row.title),
        },
      ],
      dropDownActions: [
        {
          label: '啟用',
          key: 'enabled',
        },
        {
          label: '禁用',
          key: 'disabled',
        },
      ],
      select: (key: string) => {
        if (!product)
          return;

        if (key === 'enabled')
          product.is_enabled = true;
        else
          product.is_enabled = false;

        updateEnabled(product);
      },
    });
  },
}));

onMounted(() => {
  getProducts();
});
</script>

<template>
  <NCard bordered>
    <BasicTable
      :loading="isTableLoading"
      :columns="columns"
      :action-column="getActionColumn"
      :data="getTableData"
      @reload="getProducts"
    >
      <template #tableTitle>
        <NButton @click="openProductModal(true)">
          <template #icon>
            <NIcon>
              <PlusOutlined />
            </NIcon>
          </template>
          新建
        </NButton>
      </template>
    </BasicTable>
    <ProductModal
      v-model:showModal="showModal"
      :is-new="isNew"
      :is-loading="isLoading"
      :temp-product="tempProduct"
      @add-product="addProduct"
      @update-product="updateProduct"
    />
  </NCard>
</template>

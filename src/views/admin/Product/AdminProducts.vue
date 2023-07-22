<script setup>
import { PlusOutlined } from '@vicons/antd';
import { NButton, NCard, NIcon } from 'naive-ui';
import Swal from 'sweetalert2';
import { computed, h, onMounted, ref } from 'vue';

import { BasicTable } from '@/components/Admin/Table';
import TableAction from '@/components/Admin/Table/src/components/TableAction.vue';
import {
  apiAdminDeleteProducts,
  apiAdminGetAllProducts,
  apiAdminPostProducts,
  apiAdminPutProducts
} from '@/utlis/api';
import { cityMap } from '@/utlis/context';
import { currency, formatDate2YMD } from '@/utlis/global';

import { columns } from './columns';
import ProductModal from './components/ProductModal.vue';

const isTableLoading = ref(false);
const isLoading = ref(false);
const isNew = ref(true);
const products = ref([]);
const tempProduct = ref({});
const showModal = ref(false);

const getTableData = computed(() =>
  [...products.value].map((product) => ({
    ...product,
    city: cityMap.get(product.city),
    origin_price: currency(product.origin_price),
    price: currency(product.price),
    date: formatDate2YMD(product.date)
  }))
);

const openProductModal = (status, product = {}) => {
  showModal.value = true;
  isNew.value = status;
  tempProduct.value = { ...product };
};

const closeProductModal = () => {
  showModal.value = false;
};

const getProducts = async () => {
  isTableLoading.value = true;

  try {
    const res = await apiAdminGetAllProducts();

    const {
      data: { success }
    } = res;

    if (success) {
      products.value = Object.values(res.data.products);
    }
  } finally {
    isTableLoading.value = false;
  }
};

const addProduct = async (product) => {
  isLoading.value = true;

  try {
    const res = await apiAdminPostProducts(product);

    const {
      data: { success }
    } = res;

    if (success) {
      closeProductModal();
      getProducts();
    }
  } finally {
    isLoading.value = false;
  }
};

const updateProduct = async (product) => {
  isLoading.value = true;

  const {
    data: { id }
  } = product;

  try {
    const res = await apiAdminPutProducts(id, product);

    const {
      data: { success }
    } = res;

    if (success) {
      closeProductModal();
      getProducts();
    }
  } finally {
    isLoading.value = false;
  }
};

const updateEnabled = async (product) => {
  isTableLoading.value = true;

  const {
    data: { id }
  } = product;

  try {
    const res = await apiAdminPutProducts(id, product);

    const {
      data: { success }
    } = res;

    if (success) {
      getProducts();
    }
  } finally {
    isTableLoading.value = false;
  }
};

const deleteProduct = async (id) => {
  const res = await apiAdminDeleteProducts(id);

  const {
    data: { success }
  } = res;

  if (success) {
    getProducts();
  }
};

const openDeleteModal = (id, title) => {
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
    preConfirm: () => deleteProduct(id)
  });
};

const getActionColumn = computed(() => ({
  width: 120,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(row) {
    const product = products.value.find((item) => item.id === row.id);

    return h(TableAction, {
      style: 'button',
      actions: [
        {
          label: '编辑',
          onClick: () => openProductModal(false, product)
        },
        {
          label: '删除',
          onClick: () => openDeleteModal(row.id, row.title)
        }
      ],
      dropDownActions: [
        {
          label: '启用',
          key: 'enabled'
        },
        {
          label: '禁用',
          key: 'disabled'
        }
      ],
      select: (key) => {
        if (key === 'enabled') {
          product.is_enabled = true;
        } else {
          product.is_enabled = false;
        }

        updateEnabled({ data: { ...product } });
      }
    });
  }
}));

onMounted(() => {
  getProducts();
});
</script>

<template>
  <n-card bordered>
    <BasicTable
      :loading="isTableLoading"
      :columns="columns"
      :action-column="getActionColumn"
      :data="getTableData"
      @reload="getProducts"
    >
      <template #tableTitle>
        <n-button @click="openProductModal(true)">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template>
    </BasicTable>
    <ProductModal
      :is-new="isNew"
      :is-loading="isLoading"
      :temp-product="tempProduct"
      @add-product="addProduct"
      @update-product="updateProduct"
      v-model:showModal="showModal"
    />
  </n-card>
</template>

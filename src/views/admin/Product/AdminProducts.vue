<script setup>
import Swal from 'sweetalert2';
import { inject, onMounted, ref } from 'vue';

import AddBtn from '@/components/Admin/AddBtn.vue';
import Pagination from '@/components/Admin/Pagination.vue';
import ProductModal from '@/components/Modal/ProductModal.vue';
import {
  apiAdminDeleteProducts,
  apiAdminGetProducts,
  apiAdminPostProducts,
  apiAdminPutProducts,
  apiAdminUploadImage
} from '@/utlis/api';
import { cityMap } from '@/utlis/context';
import { currency } from '@/utlis/global';

const loading = inject('loading');

const isLoading = ref(false);
const isNew = ref(true);
const products = ref([]);
const pagination = ref({});
const tempProduct = ref({});
const tempImageUrl = ref('');
const productModalRef = ref(null);

const openProductModal = (status, product = {}) => {
  productModalRef.value.openModal();
  isNew.value = status;
  tempProduct.value = { ...product };
};

const closeProductModal = () => {
  productModalRef.value.hideModal();
};

const getProducts = async (page = 1) => {
  loading.value.show();

  try {
    const res = await apiAdminGetProducts(page);

    const {
      data: { success }
    } = res;

    if (success) {
      products.value = res.data.products;
      pagination.value = res.data.pagination;
    }
  } finally {
    loading.value.hide();
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
      getProducts(pagination.value.current_page);
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
      getProducts(pagination.value.current_page);
    }
  } finally {
    isLoading.value = false;
  }
};

const deleteProduct = async (id) => {
  const res = await apiAdminDeleteProducts(id);

  const {
    data: { success }
  } = res;

  if (success) {
    getProducts(pagination.value.current_page);
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

const uploadImage = async (file) => {
  loading.value.show();

  try {
    const res = await apiAdminUploadImage(file);

    const {
      data: { success = false, imageUrl = '' }
    } = res;

    if (success) {
      tempImageUrl.value = imageUrl;
    }
  } finally {
    loading.value.hide();
  }
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="text-sm-content w-full table-fixed text-left text-cc-other-3">
      <thead class="bg-cc-other-7 text-xs text-cc-other-2">
        <tr>
          <th scope="col" class="px-6 py-3">產品名稱</th>
          <th width="10%" class="px-6 py-3">分類</th>
          <th width="15%" class="px-6 py-3">地區</th>
          <th width="20%" class="px-6 py-3">
            <div class="flex items-center">
              售價
              <!-- <a href="#" -->
              <!--   ><svg -->
              <!--     xmlns="http://www.w3.org/2000/svg" -->
              <!--     class="ml-1 h-3 w-3" -->
              <!--     aria-hidden="true" -->
              <!--     fill="currentColor" -->
              <!--     viewBox="0 0 320 512" -->
              <!--   > -->
              <!--     <path -->
              <!--       d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" -->
              <!--     /></svg -->
              <!-- ></a> -->
            </div>
          </th>
          <th width="15%" class="px-6 py-3 text-right">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="border-b bg-white">
          <th scope="row" class="truncate px-6 py-4 text-cc-other-2">
            {{ product.title }}
          </th>
          <td class="px-6 py-4">{{ product.category }}</td>
          <td class="px-6 py-4">{{ cityMap.get(product.city) }}</td>
          <td class="px-6 py-4">{{ currency(product.origin_price, 'NT ') }}</td>
          <td class="px-6 py-4 text-right">
            <button
              type="button"
              class="font-medium text-cc-primary hover:underline"
              @click="openProductModal(false, product)"
            >
              編輯
            </button>

            <button
              type="button"
              class="ml-3 font-medium text-red-600 hover:underline"
              @click="openDeleteModal(product.id, product.title)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-bind="pagination" @changePage="getProducts" />
    <AddBtn @click="openProductModal(true)" />
    <ProductModal
      ref="productModalRef"
      no-scroll
      :is-new="isNew"
      :is-loading="isLoading"
      :temp-product="tempProduct"
      :temp-Image-url="tempImageUrl"
      @add-product="addProduct"
      @update-product="updateProduct"
      @upload-image="uploadImage"
    />
  </div>
</template>

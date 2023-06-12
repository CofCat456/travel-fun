<script setup>
import { inject, onMounted, ref } from 'vue';

import Pagination from '@/components/Admin/Pagination.vue';
import Add from '@/components/Admin/Add.vue';
import ProductModal from '@/components/Modal/ProductModal.vue';

import { apiAdminGetProducts, apiAdminPostProducts, apiAdminPutProducts } from '@/utlis/api';
import { currency } from '@/utlis/global';

const loading = inject('loading');

const products = ref([]);
const pagination = ref({});
const tempProduct = ref({});
const showed = ref(false);
const isLoading = ref(false);
const isNew = ref(true);

const getProducts = async (page = 1) => {
  loading.value.show();
  try {
    const res = await apiAdminGetProducts(page);
    console.log(res);

    products.value = res?.data?.products;
    pagination.value = res?.data?.pagination;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  } finally {
    loading.value.hide();
  }
};

function openProductModal(status, product = {}) {
  showed.value = true;
  isNew.value = status;
  tempProduct.value = { ...product };
}

const addProduct = async (product) => {
  isLoading.value = true;
  try {
    await apiAdminPostProducts(product);
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  } finally {
    isLoading.value = false;
    showed.value = false;
    getProducts();
  }
};

const updateProduct = async (product) => {
  isLoading.value = true;
  const {
    data: { id }
  } = product;
  try {
    await apiAdminPutProducts(id, product);
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  } finally {
    isLoading.value = false;
    showed.value = false;
    getProducts();
  }
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="text-sm-content w-full text-left text-cc-other-3">
      <thead class="bg-cc-other-7 text-xs uppercase text-cc-other-2">
        <tr>
          <th v-for="item in ['產品名稱', '分類']" :key="item" scope="col" class="px-6 py-3">
            {{ item }}
          </th>
          <th scope="col" class="px-6 py-3">
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
          <th scope="col" class="px-6 py-3 text-right">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="border-b bg-white">
          <th scope="row" class="whitespace-nowrap px-6 py-4 text-cc-other-2">
            {{ product.title }}
          </th>
          <td class="px-6 py-4">{{ product.category }}</td>
          <td class="px-6 py-4">{{ currency(product.origin_price, 'NT ') }}</td>
          <td class="px-6 py-4 text-right">
            <button
              type="button"
              class="font-medium text-cc-primary hover:underline"
              @click="openProductModal(false, product)"
            >
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-bind="pagination" @changePage="getProducts" />
    <Add @click="openProductModal(true)" />
    <ProductModal
      no-scroll
      :showModal="showed"
      :isNew="isNew"
      :isLoading="isLoading"
      :tempProduct="tempProduct"
      @closing="showed = false"
      @addProduct="addProduct"
      @updateProduct="updateProduct"
    />
  </div>
</template>

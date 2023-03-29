<script setup>
import { inject, onMounted, ref } from 'vue';

import Pagination from '@/components/admin/Pagination.vue';
import Add from '@/components/admin/Add.vue';
import ProductModal from '@/components/Modal/ProductModal.vue';

import { apiAdminGetProducts } from '@/utlis/api';

const loading = inject('loading');

const products = ref([]);
const pagination = ref({});
const showed = ref(false);

const getProducts = async (page = 1) => {
  loading.value.show();
  try {
    const res = await apiAdminGetProducts(page);

    products.value = res?.data?.products;
    pagination.value = res?.data?.pagination;

    console.log(pagination.value);
    console.log(products.value);
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  } finally {
    loading.value.hide();
  }
};

function openModal() {
  showed.value = true;
}

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="text-sm-content w-full text-left text-cc-other-3">
      <thead class="bg-cc-other-7 text-xs uppercase text-cc-other-2">
        <tr>
          <th scope="col" class="px-6 py-3">Product name</th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">
              Color
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-3 w-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">
              Category
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-3 w-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">
              Price
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-3 w-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b bg-white">
          <th scope="row" class="whitespace-nowrap px-6 py-4 text-cc-other-2">
            Apple MacBook Pro 17"
          </th>
          <td class="px-6 py-4">Silver</td>
          <td class="px-6 py-4">Laptop</td>
          <td class="px-6 py-4">$2999</td>
          <td class="px-6 py-4 text-right">
            <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-bind="pagination" />
    <Add @click="openModal" />
    <ProductModal no-scroll :showModal="showed" @closing="showed = false" />
  </div>
</template>

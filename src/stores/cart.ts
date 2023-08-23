import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { apiUserGetCarts, apiUserPostCart } from '../utils/api';
import type { Cart } from '../types';

const useCartStore = defineStore('cart', () => {
  const isLoading = ref(false);
  const cartList = ref<Cart[]>([]);

  const totalNum = computed(() => cartList.value.length);

  const getCarts = async () => {
    const res = await apiUserGetCarts();

    const {
      data: {
        success,
        data: { carts },
      },
    } = res;

    if (success)
      cartList.value = carts;
  };

  const addCart = async (data: { data: Cart }) => {
    isLoading.value = true;

    try {
      await apiUserPostCart(data);
    }
    finally {
      await getCarts();
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    cartList,
    totalNum,
    getCarts,
    addCart,
  };
});

export default useCartStore;

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { apiUserGetCarts, apiUserPostCart } from '../utils/api';
import type { Cart } from '../types';

const useCartStore = defineStore('cart', () => {
  const isLoading = ref(false);
  const cartList = ref<Cart[]>([]);
  const total = ref(0);
  const finalTotal = ref(0);

  const totalNum = computed(() => cartList.value.length);

  const getCarts = async () => {
    const res = await apiUserGetCarts();

    const {
      data: {
        success,
        data: { carts, total: cart_total, final_total },
      },
    } = res;

    if (success) {
      cartList.value = carts;
      total.value = cart_total;
      finalTotal.value = final_total;
    }
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
    total,
    finalTotal,
    totalNum,
    getCarts,
    addCart,
  };
});

export default useCartStore;

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { apiUserGetCarts, apiUserPostCart } from '../utlis/api';

const useCartStore = defineStore('cart', () => {
  const isLoading = ref(false);
  const cartList = ref([]);

  const totalNum = computed(() => cartList.value.length);

  const getCarts = async () => {
    const res = await apiUserGetCarts();

    const {
      data: {
        data: { success, carts }
      }
    } = res;

    if (success) {
      cartList.value = carts;
    }
  };

  const addCart = async (data) => {
    isLoading.value = true;

    try {
      await apiUserPostCart(data);
    } finally {
      await getCarts();
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    cartList,
    totalNum,
    getCarts,
    addCart
  };
});

export default useCartStore;

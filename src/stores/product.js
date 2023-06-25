import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { apiUserGetProducts } from '../utlis/api';

const useProductStore = defineStore('product', () => {
  const isDone = ref(false);
  const allProductList = ref([]);

  const getSortNew = computed(() =>
    [...allProductList.value].sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
  );

  const getSortRate = computed(() =>
    [...allProductList.value].sort((a, b) => {
      if (a.evaluate > b.evaluate) {
        return -1;
      }
      if (a.evaluate < b.evaluate) {
        return 1;
      }
      if (a.evaluateNum > b.evaluateNum) {
        return -1;
      }
      if (a.evaluateNum < b.evaluateNum) {
        return 1;
      }
      return 0;
    })
  );

  const getSortRateNum = computed(() =>
    [...allProductList.value].sort((a, b) => b.evaluateNum - a.evaluateNum)
  );

  const getSortRec = computed(() =>
    [...allProductList.value].sort((a, b) => a.evaluate - b.evaluate)
  );

  const getSortPriceTo = computed(() =>
    [...allProductList.value].sort((a, b) => a.price - b.price)
  );

  const getSortFeat = computed(() => [...allProductList.value].sort(() => Math.random() - 0.5));

  const getAllProducts = async (loadingRef) => {
    loadingRef.value.show();

    try {
      const res = await apiUserGetProducts();

      const {
        data: { success, products }
      } = res;

      if (success) {
        allProductList.value = products;
        loadingRef.value.hide();
      }
    } finally {
      isDone.value = true;
    }
  };

  return {
    allProductList,
    isDone,
    getSortNew,
    getSortRate,
    getSortRateNum,
    getSortRec,
    getSortPriceTo,
    getSortFeat,
    getAllProducts
  };
});

export default useProductStore;

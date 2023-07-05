import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { apiUserGetProducts } from '../utlis/api';

const useProductStore = defineStore('product', () => {
  const isDone = ref(false);
  const allProductList = ref([]);

  const sortByPreferred = () => Math.random() - 0.5;
  const sortByNewest = (a, b) => new Date(b.date) - new Date(a.date);
  const sortByPopular = (a, b) => b.evaluate - a.evaluate || b.evaluateNum - a.evaluateNum;
  const sortByReviewCount = (a, b) => b.evaluateNum - a.evaluateNum;
  const sortByPrice = (a, b) => a.price - b.price;
  const sortRecommended = (a, b) => b.evaluate - a.evaluate;

  const getByNewest = computed(() => [...allProductList.value].sort(sortByNewest));
  const getByPreferred = computed(() => [...allProductList.value].sort(sortByPreferred));
  const getByPopular = computed(() => [...allProductList.value].sort(sortByPopular));
  const getByReviewCount = computed(() => [...allProductList.value].sort(sortByReviewCount));
  const getByPrice = computed(() => [...allProductList.value].sort(sortByPrice));
  const getByRecommended = computed(() => [...allProductList.value].sort(sortRecommended));

  const getSortData = (sortType) => {
    switch (sortType) {
      case 'popular':
        return getByPopular.value;
      case 'userRating':
        return getByReviewCount.value;
      case 'priceLowToHigh':
        return getByPrice.value;
      case 'newArrivals':
        return getByNewest.value;
      default:
        return allProductList.value;
    }
  };

  const getFilterData = (array, city = '', num = 10) => {
    let newArray = array ? [...array] : [];

    if (city) {
      newArray = newArray.filter((item) => item.city === city);
    }

    return num === 0 ? newArray : newArray.slice(0, num);
  };

  const getAllProducts = async (loadingRef, category = '') => {
    loadingRef.value.show();

    try {
      const res = await apiUserGetProducts(category);

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
    isDone,
    allProductList,
    getAllProducts,
    getByPreferred,
    getByNewest,
    getByPopular,
    getByReviewCount,
    getByPrice,
    getByRecommended,
    getSortData,
    getFilterData
  };
});

export default useProductStore;

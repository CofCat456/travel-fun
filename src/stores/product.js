import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { apiUserGetProducts } from '../utlis/api';

const useProductStore = defineStore('product', () => {
  const allProductList = ref([]);
  const productList = ref([]);

  const sortByPreferred = () => Math.random() - 0.5;
  const sortByNewest = (a, b) => new Date(b.date) - new Date(a.date);
  const sortByPopular = (a, b) => b.evaluate - a.evaluate || b.evaluateNum - a.evaluateNum;
  const sortByReviewCount = (a, b) => b.evaluateNum - a.evaluateNum;
  const sortByPrice = (a, b) => a.price - b.price;
  const sortRecommended = (a, b) => b.evaluate - a.evaluate;

  const getByAllPopular = computed(() => [...allProductList.value].sort(sortByPopular));
  const getByAllNewest = computed(() => [...allProductList.value].sort(sortByNewest));
  const getByAllPreferred = computed(() => [...allProductList.value].sort(sortByPreferred));
  const getByAllRecommended = computed(() => [...allProductList.value].sort(sortRecommended));

  const getByPopular = computed(() => [...productList.value].sort(sortByPopular));
  const getByNewest = computed(() => [...productList.value].sort(sortByNewest));
  const getByPreferred = computed(() => [...productList.value].sort(sortByPreferred));
  const getByRecommended = computed(() => [...productList.value].sort(sortRecommended));
  const getByReviewCount = computed(() => [...productList.value].sort(sortByReviewCount));
  const getByPrice = computed(() => [...productList.value].sort(sortByPrice));

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
        return productList.value;
    }
  };

  const getFilterData = (array, city = '', num = 10) => {
    let newArray = array ? [...array] : [];

    if (city) {
      newArray = newArray.filter((item) => item.city === city);
    }

    return num === 0 ? newArray : newArray.slice(0, num);
  };

  const getProducts = async (loadingRef, category = '') => {
    loadingRef.value?.show();

    const res = await apiUserGetProducts(category);

    const {
      data: { success, products }
    } = res;

    if (success) {
      productList.value = products;
      loadingRef.value?.hide();
    }
  };

  return {
    allProductList,
    productList,
    getProducts,
    getByAllPreferred,
    getByPreferred,
    getByAllNewest,
    getByNewest,
    getByAllPopular,
    getByPopular,
    getByReviewCount,
    getByPrice,
    getByAllRecommended,
    getByRecommended,
    getSortData,
    getFilterData
  };
});

export default useProductStore;

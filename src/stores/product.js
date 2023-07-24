import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { apiUserGetAllProducts, apiUSerGetProduct } from '../utlis/api';

const useProductStore = defineStore('product', () => {
  const productList = ref([]);
  const product = ref({});

  const sortByPreferred = () => Math.random() - 0.5;
  const sortByNewest = (a, b) => new Date(b.date) - new Date(a.date);
  const sortByPopular = (a, b) => b.evaluate - a.evaluate || b.evaluateNum - a.evaluateNum;
  const sortByReviewCount = (a, b) => b.evaluateNum - a.evaluateNum;
  const sortByPrice = (a, b) => a.price - b.price;
  const sortRecommended = (a, b) => b.evaluate - a.evaluate;

  const getByAllPopular = computed(() => [...productList.value].sort(sortByPopular));
  const getByAllNewest = computed(() => [...productList.value].sort(sortByNewest));
  const getByAllPreferred = computed(() => [...productList.value].sort(sortByPreferred));
  const getByAllRecommended = computed(() => [...productList.value].sort(sortRecommended));

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

  const getFilterData = (array, city = '', category = '', num = 10) => {
    let newArray = array ? [...array] : [];

    if (city) {
      newArray = newArray.filter((item) => item.city === city);
    }

    if (category) {
      newArray = newArray.filter((item) => item.category === category);
    }

    return num === 0 ? newArray : newArray.slice(0, num);
  };

  const getProducts = async (loadingRef) => {
    loadingRef.value?.show();

    const res = await apiUserGetAllProducts();

    const {
      data: { success, products }
    } = res;

    if (success) {
      productList.value = products;
      loadingRef.value?.hide();
    }
  };

  const getProduct = async (loadingRef, productId) => {
    loadingRef.value?.show();

    try {
      const res = await apiUSerGetProduct(productId);

      const {
        data: { success, product: resProduct }
      } = res;

      if (success) {
        product.value = resProduct;
        console.log(product.value);
      }
    } finally {
      loadingRef?.value?.hide();
    }
  };

  return {
    product,
    productList,
    getProduct,
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

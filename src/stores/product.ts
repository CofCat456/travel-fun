import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { apiUSerGetProduct, apiUserGetAllProducts } from '../utils/api';
import { Sort } from '@/types';
import type { Product } from '@/types';

type SortFunction<T = Product> = (a: T, b: T) => number;

const useProductStore = defineStore('product', () => {
  const productList = ref<Product[]>([]);

  const sortByPreferred = () => Math.random() - 0.5;
  const sortByNewest: SortFunction = (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime();
  const sortByPopular: SortFunction = (a, b) => b.evaluate - a.evaluate || b.evaluateNum - a.evaluateNum;
  const sortByReviewCount: SortFunction = (a, b) => b.evaluateNum - a.evaluateNum;
  const sortByPrice: SortFunction = (a, b) => a.price - b.price;
  const sortRecommended: SortFunction = (a, b) => b.evaluate - a.evaluate;

  const getByPopular = computed<Product[]>(() => [...productList.value].sort(sortByPopular));
  const getByNewest = computed<Product[]>(() => [...productList.value].sort(sortByNewest));
  const getByPreferred = computed<Product[]>(() => [...productList.value].sort(sortByPreferred));
  const getByRecommended = computed<Product[]>(() => [...productList.value].sort(sortRecommended));
  const getByReviewCount = computed<Product[]>(() => [...productList.value].sort(sortByReviewCount));
  const getByPrice = computed<Product[]>(() => [...productList.value].sort(sortByPrice));

  const getSortData = (sortType: Sort) => {
    switch (sortType) {
      case Sort.Popular:
        return getByPopular.value;
      case Sort.UserRating:
        return getByReviewCount.value;
      case Sort.PriceLowToHigh:
        return getByPrice.value;
      case Sort.NewArrivals:
        return getByNewest.value;
      default:
        return productList.value;
    }
  };

  const getFilterData = (array: Product[], city = '', category = '', num = 10) => {
    let newArray = array ? [...array] : [];

    if (city)
      newArray = newArray.filter(item => item.city === city);

    if (category)
      newArray = newArray.filter(item => item.category === category);

    return num === 0 ? newArray : newArray.slice(0, num);
  };

  const getProducts = async () => {
    const res = await apiUserGetAllProducts();

    const {
      data: { success, products },
    } = res;

    if (success)
      productList.value = products;
  };

  const getProduct = async (productId: string) => {
    const res = await apiUSerGetProduct(productId);

    const {
      data: { success, product },
    } = res;

    if (success)
      return product;
  };

  return {
    productList,
    getProduct,
    getProducts,
    getByPreferred,
    getByNewest,
    getByPopular,
    getByReviewCount,
    getByPrice,
    getByRecommended,
    getSortData,
    getFilterData,
  };
});

export default useProductStore;

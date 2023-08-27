import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { successMsg } from '@/utils/api';

const useFavoriteStore = defineStore('favorite', () => {
  const favoriteList = ref<string[]>([]);

  const addFavorite = (id: string, title: string) => {
    favoriteList.value.push(id);

    successMsg(`成功將 ${title} 加入收藏`);
  };

  const removeFavorite = (id: string, title: string) => {
    favoriteList.value = [...favoriteList.value.filter((curr: string) => curr !== id)];

    successMsg(`成功將 ${title} 移出收藏`);
  };

  const saveLocalFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favoriteList.value));
  };

  const getLocalFavorites = () => {
    const favoritesLocal = localStorage.getItem('favorites');

    if (favoritesLocal === null) {
      localStorage.setItem('favorites', JSON.stringify([]));
      return;
    }

    favoriteList.value = JSON.parse(favoritesLocal);
  };

  const checkFavorite = (id: string) => favoriteList.value.includes(id);

  const removeLocalFavorites = () => localStorage.removeItem('favorites');

  watch(() => [...favoriteList.value], () => {
    saveLocalFavorites();
  });

  onMounted(() => getLocalFavorites());

  return {
    favoriteList,
    addFavorite,
    removeFavorite,
    saveLocalFavorites,
    getLocalFavorites,
    removeLocalFavorites,
    checkFavorite,
  };
});

export default useFavoriteStore;

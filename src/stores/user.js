import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { apiUserCheckSignin, apiUserLogout, apiUserSignin } from '../utlis/api';

const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const loginStatus = ref(false);
  const isLoading = ref(false);

  const signin = async (data) => {
    isLoading.value = true;

    try {
      const res = await apiUserSignin(data);

      const {
        data: { success, token, expired }
      } = res;

      if (success) {
        document.cookie = `token=${token};expires=${new Date(expired)};`;
        loginStatus.value = true;
        router.push({ name: 'AdminHome' });
      }
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;

    try {
      const res = await apiUserLogout();

      const {
        data: { success }
      } = res;

      if (success) {
        document.cookie = 'token=;expires=;';
        loginStatus.value = false;
        router.push({ name: 'Home' });
      }
    } finally {
      isLoading.value = false;
    }
  };

  // TODO: https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
  const checkSignin = async (loadingRef) => {
    loadingRef?.value?.show();

    try {
      const res = await apiUserCheckSignin();

      const {
        data: { success }
      } = res;

      if (success && document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')) {
        loginStatus.value = true;
      }
    } catch {
      router.push({ name: 'Home' });
    } finally {
      loadingRef?.value?.hide();
    }
  };

  return { isLoading, loginStatus, signin, logout, checkSignin };
});

export default useUserStore;

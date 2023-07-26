import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { apiUserLogout, apiUserSignin } from '../utlis/api';

const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const loginStatus = ref(false);
  const isLoading = ref(false);

  const signin = async (data) => {
    isLoading.value = true;

    try {
      const res = await apiUserSignin(data);

      const {
        data: { success, token, expired },
      } = res;

      if (success) {
        document.cookie = `token=${token};expires=${new Date(expired)};`;
        loginStatus.value = true;
        router.push({ name: 'AdminHome' });
      }
    }
    finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;

    try {
      const res = await apiUserLogout();

      const {
        data: { success },
      } = res;

      if (success) {
        document.cookie = 'token=;expires=;';
        loginStatus.value = false;
        router.push({ name: 'Home' });
      }
    }
    finally {
      isLoading.value = false;
    }
  };

  return { isLoading, loginStatus, signin, logout };
});

export default useUserStore;

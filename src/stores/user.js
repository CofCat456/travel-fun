import { ref } from 'vue';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', () => {
  const loginStatus = ref(false);

  function checkSigin() {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')) {
      loginStatus.value = true;
    }
  }

  function userSignin() {
    loginStatus.value = true;
  }

  function userLogout() {
    document.cookie = 'token=;expires=;';
    loginStatus.value = false;
  }

  return { loginStatus, checkSigin, userSignin, userLogout };
});

export default useUserStore;

import { ref } from 'vue';
import { defineStore } from 'pinia';

import { token } from '../utlis/global';

export const useUserStore = defineStore('user', () => {
  const loginStatus = ref(false);

  function checkSigin() {
    if (token) {
      loginStatus.value = true;
    }
  }

  return { loginStatus, checkSigin };
});

export default {};

<script setup>
import { onMounted, provide, ref } from 'vue';
import { useRouter, RouterView } from 'vue-router';

import Header from '../components/admin/Header.vue';
import { useUserStore } from '../stores/user';
import { apiUserCheckSignin, apiUserLogout } from '../utlis/api';
import Loading from '../components/Loading.vue';

const router = useRouter();
const user = useUserStore();

const loading = ref(null);

const logout = async () => {
  loading.value.show();
  try {
    const res = await apiUserLogout();
    if (res?.data?.success) {
      user.userLogout();
      router.push({ name: 'Home' });
    }
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  } finally {
    loading.value.hide();
  }
};

const checkLogin = async () => {
  loading.value.show();

  try {
    const res = await apiUserCheckSignin();

    if (res?.data?.success) {
      user.userSignin();
    }
  } catch (err) {
    user.userLogout();
    router.push({ name: 'Home' });
  } finally {
    loading.value.hide();
  }
};

onMounted(() => {
  checkLogin();
  provide('loading', loading);
});
</script>

<template>
  <Header @logout="logout" />
  <RouterView />
  <Loading ref="loading" />
</template>

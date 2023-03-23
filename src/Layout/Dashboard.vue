<script setup>
import { onMounted, provide, ref } from 'vue';
import { useRouter, RouterView } from 'vue-router';

import Header from '../components/admin/Header.vue';
import Loading from '../components/Loading.vue';

import { useUserStore } from '../stores/user';
import { apiUserCheckSignin, apiUserLogout } from '../utlis/api';

const router = useRouter();
const user = useUserStore();

const loading = ref(null);

provide('loading', loading);

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
});
</script>

<template>
  <section class="flex h-full w-full">
    <aside class="w-56">
      <Header @logout="logout" />
    </aside>
    <main class="flex-1 bg-cc-other-7">
      <div class="border-b py-6 px-10">
        <h3>儀表板</h3>
      </div>
      <div class="py-6 px-10">
        <RouterView v-if="user.loginStatus" />
      </div>
    </main>
  </section>
  <Loading ref="loading" />
</template>

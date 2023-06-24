<script setup>
import { onMounted, provide, ref } from 'vue';
import { useRouter, RouterView } from 'vue-router';

import Header from '../components/Admin/Header.vue';
import Loading from '../components/Loading.vue';

import { apiUserCheckSignin, apiUserLogout } from '../utlis/api';

import useUserStore from '../stores/user';

const router = useRouter();
const user = useUserStore();

const loadingRef = ref(null);

provide('loading', loadingRef);

const logout = async () => {
  loadingRef.value.show();
  try {
    const res = await apiUserLogout();
    if (res?.data?.success) {
      user.userLogout();
      router.push({ name: 'Home' });
    }
  } finally {
    loadingRef.value.hide();
  }
};

const checkLogin = async () => {
  loadingRef.value.show();

  try {
    const res = await apiUserCheckSignin();

    if (res?.data?.success) {
      user.userSignin();
    }
  } catch {
    user.userLogout();
    router.push({ name: 'Home' });
  } finally {
    loadingRef.value.hide();
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
  <Loading ref="loadingRef" />
</template>

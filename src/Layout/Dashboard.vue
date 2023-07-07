<script setup>
import { onMounted, provide, ref } from 'vue';
import { RouterView } from 'vue-router';

import Header from '../components/Admin/Header.vue';
import Loading from '../components/Loading.vue';
import { useUserStore } from '../stores';

const user = useUserStore();

const loadingRef = ref(null);

provide('loading', loadingRef);

onMounted(() => {
  user.checkSignin(loadingRef);
});
</script>

<template>
  <section class="flex h-full w-full">
    <aside class="w-56">
      <Header />
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

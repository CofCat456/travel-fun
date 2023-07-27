<script setup>
import { RouterView, useRouter } from 'vue-router';
import { apiUserCheckSignin } from './utlis/api';

const router = useRouter();

router.beforeEach(async (to, from, next) => {
  const title = to.meta?.title;
  const requiresAuth = to.meta?.requiresAuth;

  if (title)
    document.title = to.meta.title;

  if (requiresAuth) {
    try {
      const res = await apiUserCheckSignin();

      const { data: { success } } = res;

      if (success)
        next();
      else
        next({ name: 'Home' });
    }
    catch {
      next({ name: 'Home' });
    }
  }
  else {
    next();
  }
});
</script>

<template>
  <RouterView />
</template>

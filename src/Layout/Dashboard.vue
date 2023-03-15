<script setup>
import { RouterView } from 'vue-router';

import Header from '../components/admin/Header.vue';

const logout = () => console.log(1);
</script>

<template>
  <Header @logout="logout" />
  <RouterView />
</template>

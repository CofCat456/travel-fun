<script setup>
import Logo from '../assets/logoImg.svg';
import DarkLogo from '../assets/logoImg_dark.svg';

defineProps({
  dark: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <img v-if="dark" alt="logo" class="h-10 object-cover" :src="DarkLogo" />
  <img v-else alt="logo" class="h-10 object-cover" :src="Logo" />
</template>

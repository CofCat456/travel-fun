<script setup lang="ts">
import { websiteConfig } from '@/config/website.config';

defineProps<{
  collapsed: boolean
}>();
</script>

<template>
  <div class="m-2 flex items-center justify-center overflow-hidden whitespace-nowrap">
    <img v-if="collapsed" class="h-8 object-cover" :src="websiteConfig.logo" alt="logo">
    <img v-else class="h-8 object-cover" :src="websiteConfig.darkLogoImage" alt="logo">
  </div>
</template>

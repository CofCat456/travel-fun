<script setup lang="ts">
import { NPopselect } from 'naive-ui';
import Menu from './Menu.vue';
</script>

<template>
  <NPopselect size="small" placement="bottom-start" :options="[]">
    <button type="button" class="mx-auto w-28 h-10 rounded-[100px] border border-white">
      選地區
    </button>
    <template #empty>
      <Menu />
    </template>
  </NPopselect>
</template>

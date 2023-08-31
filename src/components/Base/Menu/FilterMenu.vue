<script setup lang="ts">
import { KeyboardArrowDownOutlined } from '@vicons/material';
import { NButton, NDrawer, NDrawerContent, NIcon, NList } from 'naive-ui';
import { ref } from 'vue';

defineProps<{
  title: string
}>();

const show = ref(false);

function handleToggleShow() {
  show.value = !show.value;
};

const handleClose = () => show.value = false;
</script>

<template>
  <NButton round size="small" icon-placement="right" @click="handleToggleShow">
    {{ title }}
    <template #icon>
      <NIcon class="transition-transform duration-300" :class="show ? '-rotate-90' : 'rotate-0'">
        <KeyboardArrowDownOutlined />
      </NIcon>
    </template>
  </NButton>
  <NDrawer v-model:show="show" placement="bottom" @click="handleClose">
    <NDrawerContent :title="title" closable>
      <NList clickable>
        <slot />
      </NList>
    </NDrawerContent>
  </NDrawer>
</template>

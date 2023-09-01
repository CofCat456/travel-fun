<script setup lang="ts">
import { NList } from 'naive-ui';

import Title from '@/components/Title.vue';
import Container from '@/layout/Container.vue';
import type { Cart } from '@/types';

defineEmits<{
  (e: 'addCart', cart: { data: Cart }): void
}>();
</script>

<template>
  <div id="plan">
    <Container>
      <Title page title="選擇方案" />
      <NList hoverable :show-divider="false">
        <slot />
      </NList>
    </Container>
  </div>
</template>

<style scoped>
#plan :deep(.n-list) {
  @apply space-y-10 bg-transparent
}

#plan :deep(.n-list-item) {
  @apply bg-cc-other-1
}
</style>

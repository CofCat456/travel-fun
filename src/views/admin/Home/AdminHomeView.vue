<script setup>
import { ref } from 'vue';

import BottomSheet from '@/components/Modal/BottomSheet.vue';

const modalRef = ref(null);

const openModal = () => modalRef.value.show();
</script>

<template>
  <BottomSheet ref="modalRef"> 123 </BottomSheet>
  <button type="button" class="btn" @click="openModal">open modal</button>
</template>

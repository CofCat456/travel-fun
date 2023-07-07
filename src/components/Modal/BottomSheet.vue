<script setup>
import { ref } from 'vue';

import Modal from './Modal.vue';

const modalRef = ref(null);

const show = () => modalRef.value.show();
const hide = () => modalRef.value.hide();

defineExpose({
  show,
  hide
});
</script>

<template>
  <Modal
    id="bottom-sheet"
    ref="modalRef"
    no-scroll
    mode="slide"
    size="auto"
    position="bottom"
    class="bottom-sheet"
  >
    <template #header>
      <div class="flex items-center px-5 py-3">
        <button type="button" @click="hide">
          <span class="material-icons-outlined icon-hover align-top text-cc-other-2"> close </span>
        </button>
        <div class="flex-1 text-center text-base font-bold">
          <slot name="header" />
        </div>
      </div>
    </template>
    <template #content>
      <slot name="bottom-sheet-item" />
    </template>
  </Modal>
</template>

<style scoped>
#bottom-sheet :deep(.modal-window) {
  @apply rounded-t-m;
}

#bottom-sheet :deep(.modal-window > div) {
  @apply p-0;
}

#bottom-sheet :deep(.modal-content) {
  @apply max-h-[300px] overflow-y-auto;
}
</style>

<script setup>
defineEmits(['open-file-input']);
</script>

<template>
  <div
    class="flex h-full cursor-pointer items-center justify-center bg-cc-other-5/40"
    @click="$emit('open-file-input')"
  >
    <span style="font-size: 120px" class="material-icons-outlined text-cc-other-5"
      >file_upload</span
    >
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  hasNext: {
    type: Boolean,
    default: true
  },
  hasPre: {
    type: Boolean,
    default: true
  },
  totalPages: {
    type: Number,
    default: 1
  }
});
</script>

<template>
  <div
    class="flex items-center justify-between border-t border-cc-other-6 bg-white px-4 py-3 sm:px-6"
  >
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-cc-other-9">
          目前在第
          <span class="font-medium">1</span>
          頁 總共有
          <span class="font-medium">{{ totalPages }}</span>
          頁
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex gap-2 rounded-md shadow-sm" aria-label="Pagination">
          <button :disabled="hasPre" class="btn">Previous</button>
          <button :disabled="hasNext" class="btn">Next</button>
        </nav>
      </div>
    </div>
  </div>
</template>

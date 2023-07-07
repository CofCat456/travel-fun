<script setup>
import Button from './Base/Button.vue';

const props = defineProps({
  current_page: {
    type: Number,
    default: 1
  },
  has_next: {
    type: Boolean,
    default: false
  },
  has_pre: {
    type: Boolean,
    default: false
  },
  total_pages: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['change-page']);

const goPrev = () => {
  if (!props.has_pre) return;
  emit('change-page', props.current_page - 1);
};

const goNext = () => {
  if (!props.has_next) return;
  emit('change-page', props.current_page + 1);
};
</script>

<template>
  <div
    class="flex items-center justify-between border-t border-cc-other-6 bg-white px-4 py-3 sm:px-6"
  >
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-cc-other-9">
          目前在第
          <span class="font-medium">{{ current_page }}</span>
          頁 總共有
          <span class="font-medium">{{ total_pages }}</span>
          頁
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex gap-2 rounded-md shadow-sm" aria-label="Pagination">
          <Button :disabled="!has_pre" @click="goPrev">上一頁</Button>
          <Button :disabled="!has_next" @click="goNext">下一頁</Button>
        </nav>
      </div>
    </div>
  </div>
</template>

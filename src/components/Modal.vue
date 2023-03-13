<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  noScroll: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['closing']);

const showed = ref(false);

watch(
  () => props.showModal,
  (newValue) => {
    showed.value = newValue;

    if (props.noScroll) {
      if (showed.value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = null;
      }
    }
  }
);

const closing = () => {
  showed.value = false;
  emit('closing');
};

onMounted(() => {
  showed.value = props.showModal;
});
</script>

<template>
  <div
    :class="[
      'fixed top-0 left-0 z-50',
      'h-screen w-screen',
      'p-6',
      'flex items-center justify-center',
      showed ? 'opacity-100' : 'pointer-events-none opacity-0',
      'transition-all duration-300'
    ]"
  >
    <!-- Modal-Overlay -->
    <div class="absolute top-0 left-0 h-full w-full bg-black/50" @click="closing()" />

    <!-- Modal-Window -->
    <div
      :class="[
        'h-full w-full overflow-hidden rounded-md bg-white',
        showed ? 'scale-100' : 'scale-0',
        'transition-all duration-300'
      ]"
    >
      <div class="h-full w-full">
        <slot name="content">
          <div class="p-3">
            <slot name="text"> 這是 Modal 視窗 </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

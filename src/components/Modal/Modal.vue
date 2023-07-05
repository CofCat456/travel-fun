<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  noScroll: {
    type: Boolean,
    default: false
  },
  size: {
    type: [String, Number],
    default: 'md'
  },
  screen: {
    type: String,
    default: null
  },
  mode: {
    type: String,
    default: 'scale'
  },
  position: {
    type: String,
    default: 'center'
  }
});

const emit = defineEmits(['hiding']);

const showed = ref(false);

const getScreen = (screen) => {
  const screenMap = new Map().set('screen', 'screen').set('fullscreen', 'fullscreen');

  return screenMap.get(screen) ? `modal-${screenMap.get(screen)}` : null;
};

const getSize = (size) => {
  if (size === 'auto') return 'w-auto';
  if (Number(size)) return `max-w-[${size}px]`;

  const sizeMap = new Map().set('sm', '300px').set('md', '768px').set('auto', 'auto');

  return sizeMap.get(size) ? `max-w-[${sizeMap.get(size)}]` : 'max-w-[768px]';
};

const getPosition = (position) => {
  const positionMap = new Map()
    .set('center', 'centered')
    .set('top-left', 'top-left')
    .set('top-right', 'top-right')
    .set('bottom-left', 'bottom-left')
    .set('bottom-right', 'bottom-right')
    .set('bottom', 'bottom');

  return positionMap.get(position)
    ? `modal-window-${positionMap.get(position)}`
    : 'modal-window-centered';
};

const getMode = (mode) => {
  const modeMap = new Map().set('scale', 'scale').set('slide', 'slide');
  return modeMap.get(mode) ?? 'scale';
};

watch(
  () => showed.value,
  () => {
    if (props.noScroll) {
      if (showed.value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = null;
      }
    }
  }
);

const show = () => {
  showed.value = true;
};

const hide = () => {
  showed.value = false;
  emit('hiding');
};

const toggle = () => {
  showed.value = !showed.value;
};

onMounted(() => {
  showed.value = props.showModal;
});

defineExpose({
  show,
  hide,
  toggle
});
</script>

<template>
  <Transition :name="getMode(mode)" mode="out-in">
    <div v-show="showed" class="modal" :class="[showed && 'show', getMode(mode)]">
      <!-- Modal-Overlay -->
      <div class="modal-overlay" @click="hide" />

      <!-- Modal-Diglog -->
      <div class="modal-diglog" :class="[getScreen(screen), getSize(size), getPosition(position)]">
        <!-- Modal-Window -->
        <div class="modal-window">
          <div class="relative h-full space-y-4 p-5">
            <div class="modal-header">
              <slot name="header" />
            </div>
            <div class="modal-content">
              <slot name="content">
                <div class="p-3">
                  <slot name="text"> 這是 Modal 視窗 </slot>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal {
  @apply fixed inset-0 z-50;
}

.modal:not(.show) {
  @apply pointer-events-none;
}

/* Overlay */

.modal-overlay {
  @apply fixed inset-0 bg-black/50;
}

/* Diglog */

.modal-diglog {
  @apply pointer-events-none relative mx-auto w-auto;
}

/* Window */

.modal-window {
  @apply pointer-events-auto z-50 w-full overflow-hidden bg-white;
}

/* Animation */

/* Scale */

.modal.scale .modal-diglog {
  @apply scale-100 transition-all duration-300;
}

.scale-enter-active,
.scale-leave-active {
  @apply transition-all duration-300;
}

.scale-enter-from,
.scale-leave-to {
  @apply opacity-0;
}

.scale-enter-from.scale > .modal-diglog,
.scale-leave-to.scale > .modal-diglog {
  @apply scale-0;
}

/* Slide */

.modal.slide .modal-diglog {
  @apply translate-y-0 transition-all duration-500;
}

.slide-enter-active,
.slide-leave-active {
  @apply transition-all duration-500;
}

.slide-enter-from,
.slide-leave-to {
  @apply opacity-0;
}

.slide-enter-from.slide > .modal-diglog,
.slide-leave-to.slide > .modal-diglog {
  @apply translate-y-full;
}

/* Full-Screen */

.modal-fullscreen,
.modal-screen {
  @apply m-0 h-full max-h-none w-screen;
}

.modal-fullscreen .modal-window {
  @apply h-full rounded-none border-0;
}

.modal-screen .modal-window {
  @apply h-full;
}

/* Position */

.modal-window-centered {
  @apply flex min-h-screen items-center;
}

.modal-window-top-left {
  @apply absolute top-6 left-6;
}

.modal-window-top-right {
  @apply absolute top-6 right-6;
}

.modal-window-bottom-left {
  @apply absolute bottom-6 left-6;
}

.modal-window-bottom-right {
  @apply absolute bottom-6 right-6;
}

.modal-window-bottom {
  @apply absolute inset-x-0 bottom-0;
}
</style>

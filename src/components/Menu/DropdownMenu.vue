<script setup>
import { ref } from 'vue';
import { sortMap } from '../../utlis/context';

defineProps({
  value: {
    type: String,
    default: ''
  },
  productTotal: {
    type: Number,
    defautl: 0
  }
});

const isOpen = ref(false);

const toggleHandler = () => {
  isOpen.value = !isOpen.value;
};

const closeHandler = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="filter_menu">
    <button type="button" class="btn-dropdown" @click="toggleHandler">
      {{ sortMap.get(value) }}
    </button>
    <ul v-show="isOpen" class="dropdown-menu" @click="closeHandler">
      <slot name="dropdown-item">
        <li class="active">
          <p class="px-4 py-2">active</p>
        </li>
        <li>
          <p class="px-4 py-2">not active</p>
        </li>
      </slot>
    </ul>
  </div>
</template>

<style>
.filter_menu {
  @apply relative min-h-[32px] min-w-[144px];
}

.btn-dropdown {
  @apply h-auto min-h-[32px] min-w-[144px] rounded-m border border-cc-other-5 bg-[length:8px_5px] bg-[center_right_12px] bg-no-repeat px-3 py-[6px] text-left leading-normal focus:border-cc-primary;
  background-image: url(../../src/assets/ic_triangle_down.svg);
}

.dropdown-menu {
  @apply absolute top-full left-0 z-20 max-h-[290px] w-full overflow-y-auto rounded-m bg-cc-other-1 py-[10px] text-left text-sm shadow-lg xl:min-w-[250px];
}

.dropdown-menu > li {
  @apply cursor-pointer transition-colors duration-300 hover:bg-cc-other-7;
}

.dropdown-menu > li > a,
.dropdown-menu > li > p {
  @apply block px-4 py-2;
}

.dropdown-menu > li.active > a,
.dropdown-menu > li.active > p {
  @apply font-bold text-cc-primary;
}
</style>

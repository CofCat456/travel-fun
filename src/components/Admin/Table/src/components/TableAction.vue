<script setup>
import { DownOutlined } from '@vicons/antd';
import { NButton, NDropdown, NIcon } from 'naive-ui';
import { computed } from 'vue';

const props = defineProps({
  actions: {
    type: Array,
    default: null,
    required: true
  },
  dropDownActions: {
    type: Array,
    default: null
  },
  style: {
    type: String,
    default: 'button'
  },
  select: {
    type: Function,
    default: () => {}
  }
});

const getActions = computed(() => {
  return props.actions.map((action) => {
    return {
      ...action,
      size: 'small'
    };
  });
});

const getDropdownList = computed(() => {
  return props.dropDownActions;
});
</script>

<template>
  <div class="flex items-center gap-1">
    <template v-for="action in getActions" :key="action.label">
      <n-button v-bind="action">
        {{ action.label }}
        <template #icon v-if="action.hasOwnProperty('icon')">
          <n-icon :component="action.icon" />
        </template>
      </n-button>
    </template>
    <n-dropdown
      v-if="dropDownActions && getDropdownList.length"
      trigger="hover"
      :options="getDropdownList"
      @select="select"
    >
      <n-button size="small" icon-placement="right">
        <div class="flex items-center">
          <span>更多</span>
          <n-icon size="14" class="ml-1">
            <DownOutlined />
          </n-icon>
        </div>
      </n-button>
    </n-dropdown>
  </div>
</template>

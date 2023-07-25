<script setup>
import { DownOutlined } from '@vicons/antd';
import { NButton, NDropdown, NIcon } from 'naive-ui';
import { computed } from 'vue';

const { actions, dropDownActions } = defineProps({
  actions: Array,
  dropDownActions: Array,
  style: String,
  select: Function,
});

const getActions = computed(() => {
  return actions.map((action) => {
    return {
      ...action,
      size: 'small',
    };
  });
});

const getDropdownList = computed(() => {
  return dropDownActions;
});
</script>

<template>
  <div class="flex items-center gap-1">
    <template v-for="action in getActions" :key="action.label">
      <NButton v-bind="action">
        {{ action.label }}
        <template v-if="action.hasOwnProperty('icon')" #icon>
          <NIcon :component="action.icon" />
        </template>
      </NButton>
    </template>
    <NDropdown
      v-if="dropDownActions && getDropdownList.length"
      trigger="hover"
      :options="getDropdownList"
      @select="select"
    >
      <NButton size="small" icon-placement="right">
        <div class="flex items-center">
          <span>更多</span>
          <NIcon size="14" class="ml-1">
            <DownOutlined />
          </NIcon>
        </div>
      </NButton>
    </NDropdown>
  </div>
</template>

<script setup lang="ts">
import { DownOutlined } from '@vicons/antd';
import type { DropdownOption } from 'naive-ui';
import { NButton, NDropdown, NIcon } from 'naive-ui';
import { computed } from 'vue';
import type { Action } from '../types';

const { actions, dropDownActions } = defineProps<{
  style: string
  actions: Action[]
  dropDownActions?: DropdownOption[]
  select?: (key: string) => void
}>();

const getActions = computed<Action[]>(() => {
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
      v-if="dropDownActions && getDropdownList?.length"
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

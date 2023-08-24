<script setup lang="ts">
import { ColumnHeightOutlined, ReloadOutlined } from '@vicons/antd';
import type { DataTableColumns, DataTableProps, PaginationProps } from 'naive-ui';
import { NDataTable, NDivider, NDropdown, NIcon, NSpace, NSwitch, NTooltip } from 'naive-ui';
import { computed, ref, unref } from 'vue';

import { densityOptions } from '../setting';

interface Props {
  loading: boolean
  columns: DataTableColumns
  data: any
  actionColumn: any
}

const props = defineProps<Props>();

const emit = defineEmits<{ (e: 'reload'): void
}>();

const tableConfig = ref<DataTableProps>({
  striped: false,
  size: 'medium',
});

const pagination = ref<PaginationProps>({
  pageSize: 10,
  prefix({ itemCount }) {
    return `總共有 ${itemCount} 個產品`;
  },
});

// 切換斑馬線
function handleStriped(value: boolean) {
  tableConfig.value.striped = value;
}

// 密度切换
function densitySelect(type: 'small' | 'medium' | 'large') {
  tableConfig.value.size = type;
}

const reload = () => emit('reload');

// 表格大小
const getTableSize = computed(() => tableConfig.value.size);

// 表格設定
const getBindValues = computed<DataTableProps>(() => {
  const columns = props.actionColumn
    ? [...(props.columns || []), unref(props.actionColumn)]
    : [...(props.columns || [])];

  return {
    ...unref(props),
    columns,
    size: unref(getTableSize),
    striped: tableConfig.value.striped,
  };
});
</script>

<template>
  <div class="flex justify-between pb-4">
    <!-- 頂部左側區域 -->
    <div class="flex flex-1 items-center">
      <slot name="tableTitle" />
    </div>

    <div class="flex flex-1 items-center justify-end">
      <!-- 顶部右侧區域 -->
      <slot name="toolbar" />

      <!-- 斑馬紋 -->
      <NTooltip trigger="hover">
        <template #trigger>
          <NSwitch v-model:value="tableConfig.striped" class="mx-3" @update:value="handleStriped" />
        </template>
        <span>表格斑馬紋線條</span>
      </NTooltip>

      <NDivider vertical />

      <NSpace size="large">
        <!-- 刷新 -->
        <NTooltip trigger="hover">
          <template #trigger>
            <NIcon size="18">
              <ReloadOutlined @click="reload" />
            </NIcon>
          </template>
          <span>刷新</span>
        </NTooltip>

        <!-- 密度 -->
        <NDropdown v-model:value="tableConfig.size" :options="densityOptions" @select="densitySelect">
          <NIcon size="18">
            <ColumnHeightOutlined />
          </NIcon>
        </NDropdown>
      </NSpace>
    </div>
  </div>
  <div class="s-table">
    <NDataTable :pagination="pagination" v-bind="getBindValues" />
  </div>
</template>

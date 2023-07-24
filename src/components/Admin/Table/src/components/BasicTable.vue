<script setup>
import { ColumnHeightOutlined, ReloadOutlined } from '@vicons/antd';
import { NDataTable, NDivider, NDropdown, NIcon, NSpace, NSwitch, NTooltip } from 'naive-ui';
import { computed, ref, unref } from 'vue';

import { densityOptions } from '../setting';

const props = defineProps({
  ...NDataTable.props,
  actionColumn: Object,
  data: Array
});

const emit = defineEmits(['reload']);

const tableConfig = ref({
  striped: false,
  size: 'medium'
});

const pagination = ref({
  pageSize: 10,
  prefix({ itemCount }) {
    return `總共有 ${itemCount} 個產品`;
  }
});

// 切換斑馬線
function handleStriped(value) {
  tableConfig.value.striped = value;
}

// 密度切换
function densitySelect(type) {
  tableConfig.value.size = type;
}

const reload = () => emit('reload');

// 表格大小
const getTableSize = computed(() => tableConfig.value.size);

// 表格設定
const getBindValues = computed(() => {
  const columns = props.actionColumn
    ? [...(props.columns || []), unref(props.actionColumn)]
    : [...(props.columns || [])];

  return {
    ...unref(props),
    columns,
    size: unref(getTableSize),
    striped: tableConfig.value.striped
  };
});
</script>

<template>
  <div class="flex justify-between pb-4">
    <!--頂部左側區域-->
    <div class="flex flex-1 items-center">
      <slot name="tableTitle"></slot>
    </div>

    <div class="flex flex-1 items-center justify-end">
      <!--顶部右侧區域-->
      <slot name="toolbar"></slot>

      <!-- 斑馬紋 -->
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-switch
            class="mx-3"
            @update:value="handleStriped"
            v-model:value="tableConfig.striped"
          />
        </template>
        <span>表格斑馬紋線條</span>
      </n-tooltip>

      <n-divider vertical />

      <n-space size="large">
        <!-- 刷新 -->
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="18">
              <ReloadOutlined @click="reload" />
            </n-icon>
          </template>
          <span>刷新</span>
        </n-tooltip>

        <!-- 密度 -->
        <n-dropdown
          :options="densityOptions"
          @select="densitySelect"
          v-model:value="tableConfig.size"
        >
          <n-icon size="18">
            <ColumnHeightOutlined />
          </n-icon>
        </n-dropdown>
      </n-space>
    </div>
  </div>
  <div class="s-table">
    <n-data-table ref="tableElRef" :pagination="pagination" v-bind="getBindValues">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </n-data-table>
  </div>
</template>

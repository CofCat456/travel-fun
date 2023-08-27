<script setup lang="ts">
import type {
  FormRules,
} from 'naive-ui';
import {
  NButton,
  NDatePicker,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NModal,
  NSlider,
  NSwitch,
} from 'naive-ui';
import { computed, reactive, ref, watch } from 'vue';

import type { Coupon } from '@/types';

const { isNew, tempCoupon } = defineProps<{
  isNew: boolean
  isLoading: boolean
  tempCoupon: Coupon
  showModal: boolean
}>();

const emit = defineEmits<{
  (e: 'addCoupon', coupon: Coupon): void
  (e: 'updateCoupon', coupon: Coupon): void
  (e: 'update:showModal'): void
}>();

const formRef = ref<InstanceType<typeof NForm>>();
const couponValue: Coupon = reactive({
  code: '',
  due_date: 0,
  id: '',
  is_enabled: 0,
  num: 0,
  percent: 0,
  title: '',
});

const rules = computed<FormRules>(() => ({
  title: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入優惠卷名稱',
  },
  code: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入優惠碼',
  },
  timePickerValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请選擇到期日',
  },
  sliderValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '請選擇百分比',
  },
}));

const modalStatus = computed(() => `${isNew ? '新增' : '編輯'}`);

function disablePreviousDate(ts: number) {
  return ts > Date.now();
}

function onSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (isNew)
        emit('addCoupon', couponValue);
      else
        emit('updateCoupon', couponValue);
    }
  });
}

watch(
  () => tempCoupon,
  (curr) => {
    Object.assign(couponValue, {
      code: curr?.code,
      due_date: curr?.due_date,
      id: curr?.id,
      is_enabled: curr?.is_enabled,
      num: curr?.num,
      percent: curr?.percent,
      title: curr?.title,
    });
  },
  { deep: true },
);
</script>

<template>
  <NModal
    style="width: 768px"
    class="custom-card"
    preset="card"
    size="huge"
    :title="`${modalStatus}優惠卷`"
    :bordered="false"
    :show="showModal"
    :segmented="{
      content: 'soft',
      footer: false,
    }"
    @update:show="(status) => $emit('update:showModal', status)"
  >
    <div class="max-h-[500px] space-y-6 overflow-auto">
      <NForm ref="formRef" :model="couponValue" :rules="rules">
        <NGrid :cols="2" :x-gap="24">
          <NFormItemGi :span="2" label="名稱" path="title">
            <NInput
              v-model:value="couponValue.title"
              type="text"
              placeholder="輸入優惠卷名稱"
            />
          </NFormItemGi>

          <NFormItemGi :span="2" label="優惠碼" path="code">
            <NInput
              v-model:value="couponValue.code"
              type="text"
              placeholder="輸入優惠碼"
            />
          </NFormItemGi>

          <NFormItemGi label="到期日" path="date">
            <NDatePicker
              v-model:value="couponValue.due_date"
              type="date"
              :is-date-disabled="disablePreviousDate"
            />
          </NFormItemGi>

          <NFormItemGi :label="`百分比 (${couponValue.percent})`" path="percent">
            <NSlider
              v-model:value="couponValue.percent"
            />
          </NFormItemGi>

          <NFormItemGi :span="2" label="啟用優惠卷" path="is_enabled">
            <NSwitch
              v-model:value="couponValue.is_enabled"
              :checked-value="1"
              :unchecked-value="0"
            >
              <template #checked>
                啟用
              </template>
              <template #unchecked>
                未啟用
              </template>
            </NSwitch>
          </NFormItemGi>
        </NGrid>
      </NForm>
    </div>
    <template #footer>
      <NButton type="primary" block ghost :loading="isLoading" @click="onSubmit">
        {{ `${modalStatus}${isLoading ? '中' : ''}` }}
      </NButton>
    </template>
  </NModal>
</template>

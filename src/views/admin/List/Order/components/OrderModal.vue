<script setup lang="ts">
import type {
  FormRules,
} from 'naive-ui';
import {
  NAutoComplete,
  NButton,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NModal,
} from 'naive-ui';
import { computed, reactive, ref, watch } from 'vue';

import type { Order } from '@/types';

const { tempOrder } = defineProps<{
  isLoading: boolean
  tempOrder: Order
  showModal: boolean
}>();

const emit = defineEmits<{
  (e: 'updateOrder', order: Order): void
  (e: 'update:showModal'): void
}>();

const formRef = ref<InstanceType<typeof NForm>>();
const orderValue: Order = reactive({
  create_at: 0,
  id: '',
  is_paid: false,
  message: '',
  num: 0,
  products: {},
  total: 0,
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
});

const rules = computed<FormRules>(() => ({
  user: {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: '請輸入訂購姓名',
    },
    email: {
      required: true,
      trigger: ['blur', 'input'],
      message: '請輸入訂購人 Email',
    },
    tel: {
      required: true,
      trigger: ['blur', 'input'],
      message: '請輸入訂購人電話',
    },
    address: {
      required: true,
      trigger: ['blur', 'input'],
      message: '請輸入訂購人地址',
    },
  },
}));

const options = computed(() =>
  ['@gmail.com'].map((suffix) => {
    const prefix = orderValue.user.email.split('@')[0];
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    };
  }),
);

function onSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors)
      emit('updateOrder', orderValue);
  });
}

watch(
  () => tempOrder,
  (curr) => {
    Object.assign(orderValue, {
      create_at: curr?.create_at,
      id: curr?.id,
      is_paid: curr?.is_paid,
      message: curr?.message,
      num: curr?.num,
      products: curr?.products,
      total: curr?.total,
      user: {
        name: curr?.user?.name,
        email: curr?.user?.email,
        tel: curr?.user?.tel,
        address: curr?.user?.address,
      },
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
    title="編輯訂單"
    :bordered="false"
    :show="showModal"
    :segmented="{
      content: 'soft',
      footer: false,
    }"
    @update:show="(status) => $emit('update:showModal', status)"
  >
    <div class="max-h-[500px] space-y-6 overflow-auto">
      <NForm ref="formRef" :model="orderValue" :rules="rules">
        <NGrid :cols="2" :x-gap="24">
          <NFormItemGi :span="2" label="姓名" path="user.name">
            <NInput
              v-model:value="orderValue.user.name"
              type="text"
              placeholder="輸入訂購人姓名"
            />
          </NFormItemGi>

          <NFormItemGi label="Email" path="user.email">
            <NAutoComplete
              v-model:value="orderValue.user.email"
              :options="options"
              placeholder="請輸入訂購人 Email"
            />
          </NFormItemGi>

          <NFormItemGi label="電話" path="user.tel">
            <NInput
              v-model:value="orderValue.user.tel"
              type="text"
              placeholder="輸入訂購人電話"
            />
          </NFormItemGi>

          <NFormItemGi :span="2" label="地址" path="user.address">
            <NInput
              v-model:value="orderValue.user.address"
              type="text"
              placeholder="輸入訂購人地址"
            />
          </NFormItemGi>

          <NFormItemGi :span="2" label="備註" path="message">
            <NInput
              v-model:value="orderValue.message"
              type="textarea"
              placeholder="請輸入備註"
              :autosize="{
                minRows: 3,
                maxRows: 5,
              }"
            />
          </NFormItemGi>
        </NGrid>
      </NForm>
    </div>
    <template #footer>
      <NButton type="primary" block ghost :loading="isLoading" @click="onSubmit">
        編輯產品{{ `${isLoading ? '中' : ''}` }}
      </NButton>
    </template>
  </NModal>
</template>

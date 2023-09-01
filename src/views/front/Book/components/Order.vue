<script setup lang="ts">
import {
  NAutoComplete,
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NInputGroup,
} from 'naive-ui';
import { computed, onMounted, reactive, ref } from 'vue';
import type {
  FormRules,
} from 'naive-ui';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { apiUserPostCoupon, apiUserPostOrder, errorMsg } from '@/utils/api';
import type { Order } from '@/types';
import Menu from '@/views/front/Book/components/Menu.vue';
import { useCartStore } from '@/stores';

const cartStore = useCartStore();
const router = useRouter();

const { cartList, total, finalTotal } = storeToRefs(cartStore);

const { getCarts } = cartStore;

const isLoading = ref(false);
const isCouponLoading = ref(false);
const couponCode = ref('');
const formRef = ref<InstanceType<typeof NForm>>();

const orderValue: Order = reactive({
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
  message: '',
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

const checkCartClean = computed(() => cartList.value.length === 0);

const options = computed(() =>
  ['@gmail.com'].map((suffix) => {
    const prefix = orderValue.user.email.split('@')[0];
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    };
  }),
);

async function addOrder(order: Order) {
  isLoading.value = true;

  const data = {
    data: { ...order },
  };

  try {
    const res = await apiUserPostOrder(data);

    const {
      data: { orderId, success },
    } = res;

    if (success) {
      await getCarts();
      router.push({ name: 'Pay', params: { orderId } });
    }
  }
  finally {
    isLoading.value = false;
  }
}

async function useCoupon(code: string) {
  isCouponLoading.value = true;

  const data = {
    data: { code },
  };

  try {
    const res = await apiUserPostCoupon(data);

    const {
      data: { success },
    } = res;

    if (success)
      await getCarts();
  }
  finally {
    isCouponLoading.value = false;
  }
}

function onSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors)
      addOrder(orderValue);
  });
}

onMounted(() => {
  if (checkCartClean.value) {
    errorMsg('購物車內無資料');
    router.go(-1);
  }
});
</script>

<template>
  <article class="flex-1 flex flex-col gap-8">
    <NCard :bordered="false">
      <NCollapse default-expanded-names="1" accordion>
        <NCollapseItem title="訂購人資料" name="1">
          <NForm ref="formRef" :model="orderValue" :rules="rules">
            <NGrid :cols="2" :x-gap="24" item-responsive responsive="screen">
              <NFormItemGi :span="2" label="姓名" path="user.name">
                <NInput
                  v-model:value="orderValue.user.name"
                  type="text"
                  placeholder="輸入訂購人姓名"
                />
              </NFormItemGi>

              <NFormItemGi span="2 m:1" label="Email" path="user.email">
                <NAutoComplete
                  v-model:value="orderValue.user.email"
                  :options="options"
                  placeholder="請輸入訂購人 Email"
                />
              </NFormItemGi>

              <NFormItemGi span="2 m:1" label="電話" path="user.tel">
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
        </NCollapseItem>
      </NCollapse>
    </NCard>

    <NCard :bordered="false">
      <NCollapse default-expanded-names="1" accordion>
        <NCollapseItem title="使用或輸入折扣碼" name="1">
          <NInputGroup>
            <NInput
              v-model:value="couponCode"
              :style="{ width: '50%' }"
              placeholder="請輸入優惠碼"
            />
            <NButton type="primary" ghost :loading="isCouponLoading" @click="useCoupon(couponCode)">
              套用優惠卷
            </NButton>
          </NInputGroup>
        </NCollapseItem>
      </NCollapse>
    </NCard>
  </article>
  <Menu
    text="送出訂單"
    :total="total"
    :final-total="finalTotal"
    :is-loading="isLoading"
    @submit="onSubmit"
  />
</template>

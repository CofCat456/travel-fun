<script setup lang="ts">
import {
  NCard,
  NCollapse,
  NCollapseItem,
  NRadio,
  NRadioGroup,
  NSpace,
  useLoadingBar,
} from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiUserGetOrder, apiUserPostPay, errorMsg } from '@/utils/api';
import Menu from '@/views/front/Book/components/Menu.vue';

const route = useRoute();
const router = useRouter();

const loadingBar = useLoadingBar();

const pay = ref('');
const total = ref(0);
const finalTotal = ref(0);
const isLoading = ref(false);

const payWays = [
  {
    value: '信用卡/簽帳金融卡',
  },
  {
    value: 'LINE Pay',
  },
  {
    value: '街口支付',
  },
  {
    value: '超商付款／銀行轉帳',
  },
];

async function getOrder() {
  loadingBar.start();
  isLoading.value = true;

  const { orderId } = route.params;

  try {
    const res = await apiUserGetOrder(orderId as string);

    const {
      data: { order: { is_paid }, success },
    } = res;

    if (success) {
      if (is_paid) {
        errorMsg('此訂單已經付款');
        router.go(-1);
      }

      total.value = res?.data?.order?.total;
      finalTotal.value = res?.data?.order?.total;
    }
  }
  catch {
    loadingBar.error();
  }
  finally {
    loadingBar.finish();
    isLoading.value = false;
  }
}

async function payHandler() {
  isLoading.value = true;

  const { orderId } = route.params;

  try {
    const res = await apiUserPostPay(orderId as string);

    const {
      data: { success },
    } = res;

    if (success)
      router.push({ name: 'Done', params: { orderId } });
  }
  finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getOrder();
});
</script>

<template>
  <article class="flex-1 flex flex-col gap-8">
    <NCard :bordered="false">
      <NCollapse default-expanded-names="1" accordion>
        <NCollapseItem title="付款方式" name="1">
          <NRadioGroup v-model:value="pay" name="radiogroup">
            <NSpace vertical size="large">
              <template v-for="way in payWays" :key="way.value">
                <NRadio size="large" :value="way.value">
                  {{ way.value }}
                </NRadio>
              </template>
            </NSpace>
          </NRadioGroup>
        </NCollapseItem>
      </NCollapse>
    </NCard>
  </article>
  <Menu
    text="確認付款"
    :total="total"
    :final-total="finalTotal"
    :is-loading="isLoading"
    @submit="() => payHandler()"
  />
</template>

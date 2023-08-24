<script setup lang="ts">
import {
  NAutoComplete,
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItemGi,
  NGrid,
  NGridItem,
  NInput,
  NInputGroup,
} from 'naive-ui';
import { computed, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import type {
  FormRules,
} from 'naive-ui';
import { useRouter } from 'vue-router';
import Container from '@/layout/Container.vue';
import { useCartStore } from '@/stores';
import { currency } from '@/utils/global';
import Button from '@/components/Base/Button.vue';
import { apiUserPostOrder } from '@/utils/api';
import type { Order } from '@/types';

const router = useRouter();

const cartStore = useCartStore();

const { total, finalTotal } = storeToRefs(cartStore);

const isLoading = ref(false);
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

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home',
  },
  {
    title: '購物車',
    pathName: 'Cart',
  },
  {
    title: '填寫資料',
  },
]);

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

async function addOrder(order: Order) {
  isLoading.value = true;

  const data = {
    data: { ...order },
  };

  try {
    const res = await apiUserPostOrder(data);

    const {
      data: { success },
    } = res;

    if (success)
      router.push({ name: 'Home' });
  }
  finally {
    isLoading.value = false;
  }
}

function onSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      // eslint-disable-next-line no-console
      console.log(orderValue);

      addOrder(orderValue);
    }
  });
}
</script>

<template>
  <section class="bg-cc-other-7/80 py-4">
    <Container>
      <NBreadcrumb separator=">">
        <template v-for="{ title, pathName } in getBreadcrumbs" :key="title">
          <NBreadcrumbItem v-if="pathName">
            <RouterLink :to="{ name: pathName }">
              {{ title }}
            </RouterLink>
          </NBreadcrumbItem>
          <NBreadcrumbItem v-else>
            {{ title }}
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
      <div class="flex items-baseline gap-6 pt-4">
        <article class="flex-1 flex flex-col gap-8">
          <NCard :bordered="false">
            <NCollapse default-expanded-names="1" accordion>
              <NCollapseItem title="訂購人資料" name="1">
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
              </NCollapseItem>
            </NCollapse>
          </NCard>

          <NCard :bordered="false">
            <NCollapse default-expanded-names="1" accordion>
              <NCollapseItem title="使用或輸入折扣碼" name="1">
                <NInputGroup>
                  <NInput :style="{ width: '50%' }" placeholder="請輸入優惠碼" />
                  <NButton type="primary" ghost>
                    套用優惠卷
                  </NButton>
                </NInputGroup>
              </NCollapseItem>
            </NCollapse>
          </NCard>
        </article>
        <article class="w-80">
          <NCard :bordered="false">
            <NGrid :x-gap="50" :y-gap="12" :cols="2">
              <NGridItem>
                價格
              </NGridItem>
              <NGridItem class="font-bold text-right">
                {{ currency(total, 'NT$ ') }}
              </NGridItem>

              <NGridItem>
                付款金額
              </NGridItem>
              <NGridItem class="font-bold text-right text-xl text-cc-primary">
                {{ currency(finalTotal, 'NT$ ') }}
              </NGridItem>

              <NGridItem :span="2">
                <Button type="submit" class="mt-4" is-full :is-loading="isLoading" @click="onSubmit">
                  前往付款
                </Button>
              </NGridItem>
            </NGrid>
          </NCard>
        </article>
      </div>
    </Container>
  </section>
</template>

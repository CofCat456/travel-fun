<script setup lang="ts">
import { NAutoComplete, NForm, NFormItemGi, NGrid, NInput } from 'naive-ui';
import { computed, ref } from 'vue';

import Button from '@/components/Base/Button.vue';
import { websiteConfig } from '@/config/website.config';
import { useUserStore } from '@/stores';

const userStore = useUserStore();

const formRef = ref<InstanceType<typeof NForm>>();
const userValue = ref({
  username: '',
  password: '',
});

const options = computed(() =>
  ['@gmail.com'].map((suffix) => {
    const prefix = userValue.value.username.split('@')[0];
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    };
  }),
);

const rules = computed(() => ({
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入用戶名稱',
  },
  password: {
    required: true,
    trigger: ['blur', 'change'],
    message: '請輸入密碼',
  },
}));

function onSubmit() {
  formRef.value?.validate(async (errors) => {
    if (!errors)
      await userStore.signin({ ...userValue.value });
  });
}
</script>

<template>
  <div class="absolute top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2">
    <img :src="websiteConfig.logo" class="mx-auto w-10">
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h3 class="text-center font-bold">
        登入後台
      </h3>
      <NForm ref="formRef" :model="userValue" :rules="rules">
        <NGrid :cols="1">
          <NFormItemGi path="username" label="管理員帳號">
            <NAutoComplete
              v-model:value="userValue.username"
              placeholder="請輸入帳號"
              :options="options"
            />
          </NFormItemGi>

          <NFormItemGi path="password" label="管理員密碼">
            <NInput
              v-model:value="userValue.password"
              type="password"
              placeholder="請輸入密碼"
              show-password-on="mousedown"
            />
          </NFormItemGi>
        </NGrid>
      </NForm>
      <Button is-full :is-loading="userStore.isLoading" @click="onSubmit">
        登入 {{ userStore.isLoading ? '中' : '' }}
      </Button>
    </div>
  </div>
</template>

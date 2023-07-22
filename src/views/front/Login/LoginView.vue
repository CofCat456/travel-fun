<script setup>
import { NAutoComplete, NForm, NFormItemGi, NGrid, NInput } from 'naive-ui';
import { computed, ref } from 'vue';

import Button from '@/components/Base/Button.vue';
import { websiteConfig } from '@/config/website.config';
import { useUserStore } from '@/stores';

const userStore = useUserStore();

const formRef = ref(null);
const userValue = ref({
  username: '',
  password: ''
});

const options = computed(() =>
  ['@gmail.com'].map((suffix) => {
    const prefix = userValue.value.username.split('@')[0];
    return {
      label: prefix + suffix,
      value: prefix + suffix
    };
  })
);

const rules = computed(() => ({
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入用戶名稱'
  },
  password: {
    required: true,
    trigger: ['blur', 'change'],
    message: '請輸入密碼'
  }
}));

const onSubmit = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await userStore.signin({ ...userValue.value });
    }
  });
};
</script>

<template>
  <div class="absolute top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2">
    <img :src="websiteConfig.logo" class="mx-auto w-10" />
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h3 class="text-center font-bold">登入後台</h3>
      <n-form ref="formRef" :model="userValue" :rules="rules">
        <n-grid :cols="1">
          <n-form-item-gi path="username" label="管理員帳號">
            <n-auto-complete
              placeholder="請輸入帳號"
              :options="options"
              v-model:value="userValue.username"
            />
          </n-form-item-gi>

          <n-form-item-gi path="password" label="管理員密碼">
            <n-input
              type="password"
              placeholder="請輸入密碼"
              show-password-on="mousedown"
              v-model:value="userValue.password"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <Button isFull :isLoading="userStore.isLoading" @click="onSubmit">
        登入 {{ user.isLoading ? '中' : '' }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import * as yup from 'yup';

import Container from '@/Layout/Container.vue';

import { useUserStore } from '@/stores/user';

import { apiUserSignin } from '@/utlis/api';

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    username: yup.string().email('請輸入正確的 Email 格式 ㅍ_ㅍ!!').required('請輸入 Email !!'),
    password: yup.string('').min(6, '密碼長度不得小於 6').required('請輸入密碼!!')
  })
});

const user = useUserStore();

const { value: username } = useField('username');
const { value: password } = useField('password');
const isRememberMe = ref(false);
const isLoading = ref(false);

const isUserNameError = computed(() => Object.hasOwn(errors.value, 'username'));
const isPasswordError = computed(() => Object.hasOwn(errors.value, 'password'));

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  apiUserSignin({ ...values })
    .then((res) => {
      const {
        data: { success, token, expired }
      } = res;

      if (success && isRememberMe.value) {
        document.cookie = `token=${token};expires=${new Date(expired)};`;
      }

      user.loginStatus = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <Container center>
    <div class="flex h-full items-center justify-center">
      <div
        class="flex w-full flex-1 justify-center border border-cc-other-5 shadow-lg sm:rounded-lg"
      >
        <div class="p-6 sm:p-12 lg:w-1/2 xl:w-5/12">
          <img src="@/assets/logo.svg" class="mx-auto w-10" />
          <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h3 class="text-center font-bold">登入您的帳戶</h3>
            <form class="mt-8 space-y-6" @submit="onSubmit">
              <div class="-space-y-px rounded-md">
                <div class="mb-6">
                  <label for="email-input" class="mb-2 block text-sm font-medium">您的帳號</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3"
                    >
                      <svg
                        aria-hidden="true"
                        class="h-5 w-5 text-cc-other-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        ></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <input
                      id="username-input"
                      type="email"
                      class="border-1 relative block w-full rounded-m p-2.5 pl-10 ring-1 ring-inset focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                      :class="
                        isUserNameError
                          ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                      "
                      placeholder="name@google.com"
                      v-model="username"
                    />
                  </div>
                  <p class="mt-2 text-red-600">
                    <span class="text-sm font-medium leading-normal">
                      {{ errors['username'] }}</span
                    >
                  </p>
                </div>

                <div class="mb-6">
                  <label for="email-input" class="mb-2 block text-sm font-medium">您的密碼</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5 text-cc-other-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </div>
                    <input
                      id="password-input"
                      type="password"
                      class="border-1 relative block w-full rounded-m p-2.5 pl-10 ring-1 ring-inset focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                      :class="
                        isPasswordError
                          ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                      "
                      placeholder="your password"
                      v-model="password"
                    />
                  </div>
                  <p class="mt-2 text-red-600">
                    <span class="text-sm font-medium leading-normal">
                      {{ errors['password'] }}</span
                    >
                  </p>
                </div>
              </div>

              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  name="remember-me"
                  class="h-4 w-4 rounded border-cc-other-3 text-cc-primary focus:ring-cc-primary"
                  v-model="isRememberMe"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">記住我</label>
              </div>

              <button
                type="submit"
                class="btn group relative flex w-full items-center justify-center gap-2"
                :class="isLoading && 'cursor-not-allowed'"
                :disabled="isLoading"
              >
                <svg
                  v-if="isLoading"
                  class="h-6 w-6 animate-spin py-1 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span v-else class="material-icons-outlined"> person_add </span>
                登入
              </button>
            </form>
          </div>
        </div>
        <div class="hidden flex-1 bg-indigo-100 text-center lg:flex">
          <div
            class="w-full bg-cover bg-center bg-no-repeat"
            style="
              background-image: url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80');
            "
          ></div>
        </div>
      </div>
    </div>
  </Container>
</template>

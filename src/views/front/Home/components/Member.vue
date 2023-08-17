<script setup lang="ts">
import { EscalatorWarningOutlined } from '@vicons/material';
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div
    class="relative grid w-full place-items-center bg-cover bg-center bg-no-repeat md:h-[600px]"
    style="
      background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url(/images/member.jpg);
    "
  >
    <div class="bg-cc-other-8 py-10 px-3 text-center text-white md:max-w-[636px] md:py-6 md:px-10">
      <h4>帶著感激與期待，讓我們踏上旅程！</h4>
      <NIcon size="40" class="my-5 md:my-10">
        <EscalatorWarningOutlined />
      </NIcon>
      <p class="mb-4 text-center text-sm leading-5">
        當人們去旅行時，他們不僅僅是去看風景，更是去體驗不同的文化和風土人情，開拓視野和擴大人脈，旅行可以帶給人們豐富的體驗和回憶
      </p>
      <RouterLink :to="{ name: 'Login' }" class="btn">
        成為會員
      </RouterLink>
    </div>
  </div>
</template>

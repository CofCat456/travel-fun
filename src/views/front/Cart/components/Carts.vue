<script setup lang="ts">
import { NButton, NEllipsis, NGi, NGrid, NIcon, NThing, NTime, NTooltip } from 'naive-ui';
import { DeleteOutlineOutlined } from '@vicons/material';
import { ref } from 'vue';
import { currency } from '@/utils/global';
import { apiUserDelCart } from '@/utils/api';
import type { Cart } from '@/types';

defineProps<{
  cartList?: Cart[]
}>();

const emit = defineEmits<{
  (e: 'delete'): void
}>();

const isLoading = ref(false);

async function deleteCart(id: string) {
  isLoading.value = true;

  try {
    const res = await apiUserDelCart(id);

    const {
      data: { success },
    } = res;

    if (success)
      emit('delete');
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <NGrid x-gap="16" y-gap="8" responsive="screen" item-responsive :cols="8">
    <template
      v-for="{ id, product, buy_date, final_total } in cartList"
      :key="id"
    >
      <NGi span="0 m:1">
        <RouterLink :to="{ name: 'Product', params: { productId: product?.id } }">
          <img class="img w-full rounded-m aspect-[4/3]" :src="product?.imageUrl">
        </RouterLink>
      </NGi>
      <NGi span="4 m:5">
        <NThing>
          <template #header>
            <RouterLink class="font-bold hover:underline" :to="{ name: 'Product', params: { productId: product?.id } }">
              {{ product?.title }}
            </RouterLink>
          </template>
          <template #description>
            <NEllipsis :line-clamp="2">
              {{ product?.description }}
            </NEllipsis>
          </template>
          <template #footer>
            <NTime :time="buy_date" format="yyyy 年 MM 月 dd 日" />
          </template>
        </NThing>
      </NGi>
      <NGi class="place-self-center" span="3 m:1">
        <h6 class="font-bold text-cc-primary">
          {{ currency(final_total!) }}
        </h6>
      </NGi>
      <NGi class="place-self-center">
        <NTooltip trigger="hover">
          <template #trigger>
            <NButton text :loading="isLoading" @click="deleteCart(id!)">
              <NIcon size="24">
                <DeleteOutlineOutlined />
              </NIcon>
            </NButton>
          </template>
          從購物車中移除 {{ product?.title }}
        </NTooltip>
      </NGi>
    </template>
  </NGrid>
</template>

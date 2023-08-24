<script setup lang="ts">
import { NButton, NEllipsis, NGi, NGrid, NIcon, NTooltip } from 'naive-ui';
import { DeleteOutlineOutlined } from '@vicons/material';
import { ref } from 'vue';
import { currency, formatDate2YMD } from '@/utils/global';
import { apiUserDeleteCart } from '@/utils/api';
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
    const res = await apiUserDeleteCart(id);

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
  <NGrid :y-gap="8" :cols="1">
    <template
      v-for="{ id, product, buy_date, final_total } in cartList"
      :key="id"
    >
      <NGi>
        <div class="flex items-center gap-x-2">
          <RouterLink :to="{ name: 'Product', params: { productId: product?.id } }">
            <img class="img w-32 rounded-m aspect-[4/3]" :src="product?.imageUrl">
          </RouterLink>
          <h3 class="text-sm-content inline-flex gap-y-2 flex-col flex-1 px-3">
            <RouterLink class="font-bold hover:underline" :to="{ name: 'Product', params: { productId: product?.id } }">
              {{ product?.title }}
            </RouterLink>
            <NEllipsis :line-clamp="2">
              {{ product?.description }}
            </NEllipsis>
            <span>{{ formatDate2YMD(buy_date) }}</span>
          </h3>
          <h6 class="font-bold text-cc-primary w-2/12">
            {{ currency(final_total!, 'NT$ ') }}
          </h6>
          <div class="w-1/12">
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
          </div>
        </div>
      </NGi>
    </template>
  </NGrid>
</template>

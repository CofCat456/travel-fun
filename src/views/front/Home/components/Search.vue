<script setup lang="ts">
import { NButton, NCard, NEllipsis, NEmpty, NPopselect, NScrollbar } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useProductStore } from '@/stores';
import { cityMap } from '@/utils/context';

const productStore = useProductStore();

const { productList } = storeToRefs(productStore);

const searchText = ref('');

const getFilterList = computed(() => productList.value.filter(({ title, city }) => title.match(searchText.value) || (cityMap.get(city)).match(searchText.value)));
</script>

<template>
  <NPopselect trigger="click" :options="[]" width="trigger">
    <div
      class="search-shadow relative flex w-full items-center gap-2 rounded-m bg-white py-3 px-3 md:absolute md:left-1/2 md:bottom-0 md:max-w-[640px] md:-translate-x-1/2 md:translate-y-1/2 md:px-5"
    >
      <input
        v-model.trim="searchText"
        type="text"
        class="w-0 flex-1 border-0 ring-0 focus:outline-0 focus:ring-0 focus-visible:outline-none"
        placeholder="搜尋你想去的目的地 / 城市"
      >
      <button type="button" class="rounded-m bg-cc-accent px-6 py-[10.5px] text-white">
        搜尋
      </button>
    </div>
    <template #empty>
      <NScrollbar v-if="getFilterList.length !== 0" style="max-height: 300px">
        <div class="flex flex-col p-4">
          <template v-for="{ id, title, city, imageUrl } in getFilterList" :key="title">
            <NCard size="small" content-style="padding: 0px" :bordered="false">
              <RouterLink v-slot="{ navigate }" custom :to="{ name: 'Product', params: { productId: id } }">
                <div class="flex items-start gap-2 p-2 rounded-m hover:bg-cc-primary/10 transition-colors cursor-pointer" @click="navigate">
                  <div class="rounded-m overflow-hidden">
                    <img class="img w-10 aspect-square" :src="imageUrl">
                  </div>
                  <div class="flex flex-col justify-between">
                    <NEllipsis style="max-width: 400px">
                      {{ title }}
                    </NEllipsis>
                    <p class="text-[12px] text-cc-other-4">
                      {{ cityMap.get(city) }}
                    </p>
                  </div>
                </div>
              </RouterLink>
            </NCard>
          </template>
        </div>
      </NScrollbar>
      <div v-else class="p-4">
        <NEmpty description="眼睛業障重">
          <template #extra>
            <RouterLink v-slot="{ navigate }" custom :to="{ name: 'CountryProducts', params: { countryName: 'taiwan' } }">
              <NButton size="small" @click="navigate">
                前往商品頁面
              </NButton>
            </RouterLink>
          </template>
        </NEmpty>
      </div>
    </template>
    <template #action>
      <!-- TODO: 收尋紀錄 -->
    </template>
  </NPopselect>
</template>

<style scoped>
.search-shadow {
  box-shadow: 0px 0px 20px 0px #00000033;
}
</style>

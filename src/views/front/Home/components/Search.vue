<script setup lang="ts">
import { NButton, NEmpty, NIcon, NList, NListItem, NPopselect, NScrollbar, NThing } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { LocationOnOutlined } from '@vicons/material';
import { useProductStore } from '@/stores';
import { cityMap } from '@/utils/context';

const router = useRouter();

const productStore = useProductStore();

const { productList } = storeToRefs(productStore);

const searchText = ref('');

const getFilterList = computed(() => productList.value.filter(({ title, city }) => title.match(searchText.value) || (cityMap.get(city)).match(searchText.value)));

function handleSearch() {
  if (getFilterList.value.length === 0)
    return;

  const { id: productId } = getFilterList.value[0];

  router.push({ name: 'Product', params: { productId } });
};
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
      <button type="button" class="rounded-m bg-cc-accent px-6 py-[10.5px] text-white" @click.stop="handleSearch">
        搜尋
      </button>
    </div>
    <template #empty>
      <NScrollbar v-if="getFilterList.length !== 0" style="max-height: 300px">
        <NList hoverable clickable>
          <template v-for="{ id, title, city, imageUrl } in getFilterList" :key="id">
            <RouterLink v-slot="{ navigate }" :to="{ name: 'Product', params: { productId: id } }" custom>
              <NListItem @click="navigate">
                <template #prefix>
                  <div class="w-10 aspect-square rounded-m overflow-hidden">
                    <img class="img" :src="imageUrl">
                  </div>
                </template>
                <NThing :title="title">
                  <template #description>
                    <div class="flex items-center gap-1 text-cc-other-4">
                      <NIcon size="16">
                        <LocationOnOutlined />
                      </NIcon>
                      <p class="text-[12px]">
                        <span>{{ cityMap.get(city) }}</span>
                      </p>
                    </div>
                  </template>
                </NThing>
              </NListItem>
            </RouterLink>
          </template>
        </NList>
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

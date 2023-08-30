<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NCard, NEmpty, NList, NListItem } from 'naive-ui';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import WishCard from '@/views/front/WishList/components/WishCard.vue';
import Container from '@/layout/Container.vue';
import { useDeviceStore, useFavoriteStore, useProductStore } from '@/stores';

const deviceStore = useDeviceStore();
const favoriteStore = useFavoriteStore();
const productStore = useProductStore();

const { isMobile } = storeToRefs(deviceStore);
const { favoriteList } = storeToRefs(favoriteStore);
const { productList } = storeToRefs(productStore);

const getBreadcrumbs = computed(() => [
  {
    title: '首頁',
    pathName: 'Home',
  },
  {
    title: '我的收藏',
  },
]);

const getFavoriteProductList = computed(() => productList.value.filter(({ id }) => favoriteList.value.includes(id)));
</script>

<template>
  <section class="bg-cc-other-7/80 py-5 flex-1">
    <Container size="sm">
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
      <NCard
        class="my-5"
        title="我的最愛"
        size="large"
        :bordered="false"
        :segmented="{
          content: true,
          footer: true,
        }"
      >
        <template v-if="favoriteList.length !== 0">
          <NList hoverable clickable>
            <template v-for="product in getFavoriteProductList" :key="product.id">
              <NListItem>
                <template v-if="!isMobile" #prefix>
                  <div class="w-[200px] aspect-[4/3] rounded-m overflow-hidden">
                    <img class="img" :src="product?.imageUrl">
                  </div>
                </template>
                <div v-if="isMobile" class="w-full aspect-video mb-4 rounded-m overflow-hidden">
                  <img class="img" :src="product?.imageUrl">
                </div>
                <WishCard v-bind="product" />
              </NListItem>
            </template>
          </NList>
        </template>
        <NEmpty v-else size="huge" description="您目前沒有最愛清單" />
      </NCard>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NCard, NEmpty } from 'naive-ui';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import WishCard from '@/views/front/WishList/components/WishCard.vue';
import Container from '@/layout/Container.vue';
import { useFavoriteStore, useProductStore } from '@/stores';

const productStore = useProductStore();
const favoriteStore = useFavoriteStore();

const { productList } = storeToRefs(productStore);
const { favoriteList } = storeToRefs(favoriteStore);

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
        <div v-if="favoriteList.length !== 0" class="flex flex-col gap-4">
          <template v-for="product in getFavoriteProductList" :key="product.id">
            <WishCard v-bind="product" />
          </template>
        </div>
        <NEmpty v-else size="huge" description="您目前沒有最愛清單" />
      </NCard>
    </Container>
  </section>
</template>

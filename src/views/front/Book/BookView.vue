<script setup lang="ts">
import {
  NBreadcrumb,
  NBreadcrumbItem,
} from 'naive-ui';
import { computed } from 'vue';

import { useRoute } from 'vue-router';
import Container from '@/layout/Container.vue';

const route = useRoute();

const orderBreadcrumbs = [
  {
    title: '填寫訂單資料',
    pathName: '',
  },
];

const payBreadcrumbs = [
  {
    title: '付款',
    pathName: '',
  },
];

const doneBreadcrumbs = [
  {
    title: '訂購完成',
    pathName: '',
  },
];

const getStep = computed(() => route.name);

const getBreadcrumbs = computed(() => {
  const breadcrumbs = [
    {
      title: '購物車',
      pathName: 'Cart',
    },
  ];

  if (getStep.value === 'Order')
    return [...breadcrumbs, ...orderBreadcrumbs];

  if (getStep.value === 'Pay')
    return [...breadcrumbs, ...orderBreadcrumbs, ...payBreadcrumbs];

  if (getStep.value === 'Done')
    return [...breadcrumbs, ...orderBreadcrumbs, ...payBreadcrumbs, ...doneBreadcrumbs];

  return breadcrumbs;
});
</script>

<template>
  <section class="bg-cc-other-7/80 py-4 flex-1">
    <Container :size="getStep === 'Done' ? 'sm' : 'md'">
      <NBreadcrumb separator=">">
        <template v-for="{ title, pathName } in getBreadcrumbs" :key="title">
          <NBreadcrumbItem v-if="pathName">
            <RouterLink :to="{ name: pathName }">
              {{ title }}
            </RouterLink>
          </NBreadcrumbItem>
          <NBreadcrumbItem v-else :clickable="false">
            {{ title }}
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
      <div class="flex md:items-baseline gap-6 pt-4" :class="getStep === 'Done' ? 'flex-col' : 'flex-col md:flex-row'">
        <RouterView />
      </div>
    </Container>
  </section>
</template>

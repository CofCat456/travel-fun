<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  breadcrumbs: Array,
});
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1">
      <li
        v-for="({ title, pathName, params = null }, index) in breadcrumbs || []"
        :key="title"
        class="inline-flex items-center"
      >
        <svg
          v-if="index !== 0"
          aria-hidden="true"
          class="mr-1 h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <RouterLink
          v-if="pathName"
          :to="{ name: pathName, params }"
          class="inline-flex items-center text-sm font-medium text-cc-primary hover:underline"
        >
          {{ title }}
        </RouterLink>
        <span v-else class="text-sm font-medium text-cc-other-4">{{ title }}</span>
      </li>
    </ol>
  </nav>
</template>

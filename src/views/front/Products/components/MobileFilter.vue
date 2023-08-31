<script setup lang="ts">
import { NListItem, NThing } from 'naive-ui';
import FilterMenu from '@/components/Base/Menu/FilterMenu.vue';
import type { Sort } from '@/types';

defineProps<{
  isCity: boolean
  currEnTarget: string
  array: Record<string, string>[]
  currSort: string
  sortArray: Record<string, Sort>[] }>();

defineEmits<{
  (e: 'update:params', city: string): void
  (e: 'update:sort', item: Sort): void
  (e: 'openMap'): void
}>();
</script>

<template>
  <div class="sticky top-28 z-20 block bg-cc-other-1 md:hidden">
    <div class="flex h-12 items-center">
      <div class="mx-5 inline-flex flex-1 items-center gap-2 overflow-x-auto">
        <FilterMenu :title="isCity ? '城市' : '國家'">
          <NListItem
            v-for="{ label, key } in array || []"
            :key="key"
            class="flex cursor-pointer items-center justify-between border-b border-cc-other-5/50 px-4 py-2"
            @click="$emit('update:params', key)"
          >
            <NThing content-indented>
              <template #avatar>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-cc-accent"
                  :class="key === currEnTarget ? 'opacity-100' : 'opacity-0'"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </template>
              <template #description>
                {{ label }}
              </template>
            </NThing>
          </NListItem>
        </FilterMenu>
        <FilterMenu title="排列">
          <NListItem
            v-for="{ label, value } in sortArray || []"
            :key="value"
            class="flex cursor-pointer items-center justify-between border-b border-cc-other-5/50 px-4 py-2"
            @click="$emit('update:sort', value)"
          >
            <NThing content-indented>
              <template #avatar>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-cc-accent"
                  :class="value === currSort ? 'opacity-100' : 'opacity-0'"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </template>
              <template #description>
                {{ label }}
              </template>
            </NThing>
          </NListItem>
        </FilterMenu>
      </div>
      <div class="p-3 shadow-[-5px_0_5px_-5px_rgba(50,48,44,.3)]">
        <button type="button" class="block" @click="$emit('openMap')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

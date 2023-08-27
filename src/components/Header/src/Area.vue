<script setup lang="ts">
import { NButton, NPopselect } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { cityData, cityMap, cityPos } from '@/utils/context';
</script>

<template>
  <NPopselect size="small" placement="bottom-start" :options="[]">
    <button type="button" class="h-full w-28 rounded-[100px] border border-white">
      選地區
    </button>
    <template #empty>
      <div class="flex flex-col gap-3 px-4 py-3">
        <template v-for="(citys, key) in cityData" :key="key">
          <div class="text-sm-content">
            <p class="w-full py-1 text-cc-accent border-b border-cc-accent">
              {{ cityPos.get(key) }}
            </p>
            <div class="my-2 flex items-center gap-4 flex-wrap">
              <template v-for="cityName in citys" :key="cityName">
                <RouterLink v-slot="{ navigate }" custom :to="{ name: 'City', params: { cityName } }">
                  <NButton text @click="navigate">
                    {{ cityMap.get(cityName) }}市
                  </NButton>
                </RouterLink>
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
  </NPopselect>
</template>

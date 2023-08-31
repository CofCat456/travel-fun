<script setup lang="ts">
import { CloseOutlined } from '@vicons/material';
import { NButton, NIcon, NModal, NRate, NSpace } from 'naive-ui';
import { reactive, ref } from 'vue';
import { GoogleMap, InfoWindow, Marker, MarkerClusterer } from '@voomap/map';
import type { Coordinates, Product } from '@/types';

import { currency } from '@/utils/global';

const { products } = defineProps<{
  isMobile: boolean
  products: Product[]
}>();

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const center = reactive({
  lat: 25.0425,
  lng: 121.5468,
});

const showMap = ref(false);

function penTo(coordinates: Coordinates) {
  Object.assign(center, coordinates);
}

function openMap() {
  showMap.value = true;
}

function closeMap() {
  showMap.value = false;
}

defineExpose({
  openMap,
  closeMap,
});
</script>

<template>
  <NModal v-model:show="showMap" block-scroll mask-closable>
    <div class="flex h-screen w-full md:p-8 p-0">
      <div
        v-if="!isMobile"
        class="z-10 w-[400px] overflow-y-auto bg-cc-other-1 shadow-[6px_0_5px_-3px_rgba(0,0,0,.2)]"
      >
        <ul class="flex flex-col p-[10px]">
          <template v-for="{ title, evaluate, evaluateNum, price, coordinates, imageUrl } in products" :key="title">
            <div
              class="product-map-card mb-[10px] flex cursor-pointer border border-cc-other-6"
              @click="penTo(coordinates)"
            >
              <div class="aspect-square w-[120px] overflow-hidden">
                <img :src="imageUrl" class="img" loading="lazy" :alt="title">
              </div>
              <div class="flex min-w-0 flex-1 flex-col p-[10px]">
                <p class="text-sm-content line-clamp-3 mb-1">
                  {{ title }}
                </p>
                <div class="flex flex-1 items-end justify-between">
                  <div class="flex flex-col gap-1">
                    <NSpace size="small">
                      <NRate readonly allow-half size="small" :default-value="evaluate" />
                      <p class="text-sm-content text-cc-other-3">
                        ({{ evaluateNum }})
                      </p>
                    </NSpace>
                    <h6 class="font-bold">
                      {{ currency(price) }}
                    </h6>
                  </div>
                  <NButton type="primary" ghost>
                    立即訂購
                  </NButton>
                </div>
              </div>
            </div>
          </template>
        </ul>
      </div>
      <GoogleMap
        disable-default-u-i
        class="flex-1 rounded-m"
        :api-key="VITE_GOOGLE_MAP_API_KEY"
        :center="center"
        :zoom="11"
      >
        <MarkerClusterer>
          <Marker v-for="{ id, coordinates, title } in products" :key="id" :position="coordinates">
            <InfoWindow>
              <div class="p-3">
                {{ title }}
              </div>
            </infowindow>
          </Marker>
        </Markerclusterer>
      </GoogleMap>
      <button
        type="button"
        class="fixed top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cc-other-1 shadow-2xl"
        @click="showMap = false"
      >
        <NIcon size="24">
          <CloseOutlined />
        </NIcon>
      </button>
    </div>
  </NModal>
</template>

<script setup>
import { Loader } from '@googlemaps/js-api-loader';
import { CloseOutlined } from '@vicons/material';
import { NButton, NIcon, NModal, NRate, NSpace } from 'naive-ui';
import { ref } from 'vue';

import { currency } from '@/utlis/global';

import { useGo } from '@/composables/product';

const { products } = defineProps({
  products: Array,
});

const { goProduct } = useGo();

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const states = ref({
  google: null,
  map: null,
  markers: null,
});

const showMap = ref(false);

async function initMap() {
  const loader = new Loader({
    apiKey: VITE_GOOGLE_MAP_API_KEY,
    version: 'weekly',
    libraries: ['places'],
    language: 'zh-TW',
  });
  states.value.google = await loader.load();
  states.value.map = new states.value.google.maps.Map(document.getElementById('map'), {
    center: { lat: 25.0425, lng: 121.5468 },
    zoom: 11,
    mapTypeControl: false,
    fullscreenControl: false,
  });
}

async function handleLoadMarkers() {
  products.forEach((product) => {
    const { id, coordinates } = product;
    const marker = new states.value.google.maps.Marker({
      position: { lat: coordinates.lat, lng: coordinates.lng },
      map: states.value.map,
      draggable: true,
    });

    marker.addListener('click', () => goProduct(id));
  });
}

async function penTo(coordinates) {
  states.value.map.panTo(coordinates);
}

async function openMap() {
  showMap.value = true;
  await initMap();
  handleLoadMarkers();
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
  <NModal v-model:show="showMap" mask-closable>
    <div class="flex h-screen w-full p-8">
      <div
        class="z-10 w-[400px] overflow-y-auto bg-cc-other-1 shadow-[6px_0_5px_-3px_rgba(0,0,0,.2)]"
      >
        <ul class="flex flex-col p-[10px]">
          <template v-for="product in products" :key="product.title">
            <div
              class="product-map-card mb-[10px] flex cursor-pointer border border-cc-other-6"
              @click="penTo(product.coordinates)"
            >
              <div class="aspect-square w-[120px] overflow-hidden">
                <img :src="product.imageUrl" class="img" loading="lazy" :alt="product.title">
              </div>
              <div class="flex min-w-0 flex-1 flex-col p-[10px]">
                <p class="text-sm-content line-clamp-3 mb-1">
                  {{ product.title }}
                </p>
                <div class="flex flex-1 items-end justify-between">
                  <div class="flex flex-col gap-1">
                    <NSpace size="small">
                      <NRate readonly allow-half size="small" :default-value="product.evaluate" />
                      <p class="text-sm-content text-cc-other-3">
                        ({{ product.evaluateNum }})
                      </p>
                    </NSpace>
                    <h6 class="font-bold">
                      {{ currency(product.price, 'NT$ ') }}
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
      <div id="map" class="flex-1 rounded-m" />
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

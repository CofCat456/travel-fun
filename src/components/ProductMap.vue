<script setup>
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { onMounted, ref, toRaw } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { icons } from '../utlis/context';
import { currency } from '../utlis/global';
import FullStarIcon from './Icons/FullStarIcon.vue';

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
});

const router = useRouter();

const map = ref({});
const products = ref([]);
const mapContainer = ref(null);

const getProductUrl = (productId) => {
  const routeUrl = router.resolve({ name: 'Product', params: { productId } }).href;
  return routeUrl;
};

const addMapMarker = (x, y, product) => {
  const icon = icons.orange;

  L.marker([x, y], {
    icon
  })
    .addTo(toRaw(map.value))
    .bindPopup(
      `
            <a
              href="${getProductUrl(product.title)}"
              class="product-map-card flex cursor-pointer"
            >
              <div class="w-[120px] overflow-hidden">
                <img src="${product.image}" class="img" loading="lazy" alt="${product.title}" />
              </div>
              <div class="flex-1 flex flex-col min-w-0 p-[10px]">
                <p class="line-clamp-3 text-sm-content mb-1">${product.title}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1">
                    <div class="inline-flex items-center text-cc-accent">
                      <span class="material-icons-outlined sm" >
                        star
                      </span>
                    </div>
                    <p class="text-sm text-cc-accent leading-normal">${product.evaluate.toFixed(
                      1
                    )}</p>
                    <p class="text-sm-content text-cc-other-3">(${product.evaluateTotal}則評價)</p>
                  </div>
                  <h6 class="font-bold">
                    ${currency(product.price, 'NT$ ')}
                  </h6>
                </div>
              </div>
            </a>
`,
      { closeButton: false, minWidth: 375 }
    );
};

const penTo = (x, y, product) => {
  const icon = icons.orange;

  map.value.panTo(new L.LatLng(x, y)).setZoom(16);

  L.marker([x, y], {
    icon
  })
    .addTo(toRaw(map.value))
    .bindPopup(
      `
            <a
              href="${getProductUrl(product.title)}"
              class="product-map-card flex cursor-pointer"
            >
              <div class="w-[120px] overflow-hidden">
                <img src="${product.image}" class="img" loading="lazy" alt="${product.title}" />
              </div>
              <div class="flex-1 flex flex-col justify-between min-w-0 p-[10px]">
                <p class="line-clamp-3 text-sm-content mb-1">${product.title}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1">
                    <div class="inline-flex items-center text-cc-accent">
                      <span class="material-icons-outlined sm" >
                        star
                      </span>
                    </div>
                    <p class="text-sm text-cc-accent leading-normal">${product.evaluate.toFixed(
                      1
                    )}</p>
                    <p class="text-sm-content text-cc-other-3">(${product.evaluateTotal}則評價)</p>
                  </div>
                  <h6 class="font-bold">
                    ${currency(product.price, 'NT$ ')}
                  </h6>
                </div>
              </div>
            </a>
`,
      { closeButton: false, minWidth: 375 }
    )
    .openPopup();
};

const updateMaker = () => {
  products.value.forEach((product) => {
    const { geometry } = product;
    addMapMarker(geometry.coordinates[0], geometry.coordinates[1], product);
  });

  if (products.value.length > 0) {
    penTo(
      products.value[0].geometry.coordinates[0],
      products.value[0].geometry.coordinates[1],
      products.value[0]
    );
  }
};

onMounted(() => {
  products.value = props.products;

  map.value = L.map(mapContainer.value, {
    center: [25.03, 121.55],
    zoom: 14
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value);

  updateMaker();
});
</script>

<template>
  <div class="relative flex h-full flex-wrap space-x-0">
    <div class="max-h-full w-full sm:w-[400px]">
      <div class="h-full overflow-y-auto">
        <ul class="flex flex-col p-[10px]">
          <template v-for="product in products" :key="product.title">
            <a
              class="product-map-card mb-[10px] flex cursor-pointer border border-cc-other-6"
              @click="
                penTo(product.geometry.coordinates[0], product.geometry.coordinates[1], product)
              "
            >
              <div class="aspect-square w-[120px] overflow-hidden">
                <img :src="product.image" class="img" loading="lazy" :alt="product.title" />
              </div>
              <div class="flex min-w-0 flex-1 flex-col p-[10px]">
                <p class="text-sm-content line-clamp-3 mb-1">{{ product.title }}</p>
                <div class="flex flex-1 items-end justify-between">
                  <div class="flex flex-col gap-1">
                    <FullStarIcon
                      sm
                      :show-evaluate="false"
                      :evaluate="product.evaluate"
                      :evaluate-num="product.evaluateNum"
                    />
                    <h6 class="font-bold">
                      {{ currency(product.price, 'NT$ ') }}
                    </h6>
                  </div>
                  <RouterLink
                    class="btn text-sm-content px-4 py-2"
                    :to="{ name: 'Product', params: { productId: product.title } }"
                    >立即訂購</RouterLink
                  >
                </div>
              </div>
            </a>
          </template>
        </ul>
      </div>
    </div>
    <div class="flex-1">
      <div id="map" ref="mapContainer"></div>
    </div>
  </div>
</template>

<style>
#map {
  height: 100%;
}

.leaflet-popup-content-wrapper {
  padding: 0;
  border-radius: 6px;
  box-shadow: 0 2px 10px 1px rgb(0 0 0 / 50%);
}

.leaflet-popup-content-wrapper .leaflet-popup-content {
  margin: 0;
  line-height: 1.5;
  color: #181818;
  font-size: 14px;
}

.leaflet-container a,
.leaflet-container p {
  margin: 0;
  padding: 0;
}

.leaflet-container a {
  color: #181818;
}

.sm {
  font-size: 16px;
}
</style>

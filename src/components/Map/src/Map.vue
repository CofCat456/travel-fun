<script setup>
import { Loader } from '@googlemaps/js-api-loader';
import { computed, onMounted, ref } from 'vue';
import Title from '../../Title.vue';

const { title, coordinates = {} } = defineProps({
  title: String,
  coordinates: Object,
});

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const states = ref({
  google: null,
  map: null,
  markers: null,
});
const info = ref(null);

const googleMapsUrl = computed(() => {
  return `https://www.google.com/maps?q=${coordinates.lat}, ${coordinates.lng}`;
});

async function initMap() {
  const loader = new Loader({
    apiKey: VITE_GOOGLE_MAP_API_KEY,
    version: 'weekly',
    libraries: ['places'],
    language: 'zh-TW',
  });

  states.value.google = await loader.load();
  states.value.map = new states.value.google.maps.Map(document.getElementById('map'), {
    center: { ...coordinates },
    zoom: 11,
    mapTypeControl: false,
    fullscreenControl: false,
  });

  info.value = new states.value.google.maps.InfoWindow({
    content: title,
  });
}

async function handleLoadMarkers() {
  const marker = new states.value.google.maps.Marker({
    position: { ...coordinates },
    map: states.value.map,
    draggable: true,
  });

  marker.addListener('click', () => window.open(googleMapsUrl.value));
  marker.addListener('mouseover', () => info.value.open(states.value.map, marker));
  marker.addListener('mouseout', () => info.value.close());
}

onMounted(async () => {
  await initMap();
  handleLoadMarkers();
});
</script>

<template>
  <div class="w-full">
    <Title title="地點" />
    <div id="map" class="h-[400px] rounded-m overflow-hidden" />
  </div>
</template>

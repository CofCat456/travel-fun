<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map';
import Title from '../../Title.vue';
import type { Coordinates } from '@/types';

const { title, coordinates } = defineProps<{
  title: string
  coordinates: Coordinates
}>();

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;
</script>

<template>
  <div class="w-full">
    <Title title="地點" />
    <div class="rounded-m w-full h-[400px] overflow-hidden">
      <GoogleMap
        disable-default-u-i
        :api-key="VITE_GOOGLE_MAP_API_KEY"
        :center="coordinates"
        :zoom="20"
      >
        <Marker :title="title" :position="coordinates">
          <InfoWindow initial-state />
        </Marker>
      </GoogleMap>
    </div>
  </div>
</template>

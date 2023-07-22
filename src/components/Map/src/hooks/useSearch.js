import { Loader } from '@googlemaps/js-api-loader';
import { onMounted, ref } from 'vue';

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

// Hook：透過地址獲取座標
export function useGeocodeAddress() {
  const coordinates = ref(null);
  const isSearching = ref(false);
  const response = ref({
    type: 'success',
    text: ''
  });

  const states = ref({
    google: null,
    map: null,
    markers: null
  });

  const geocodeAddress = async (address) => {
    isSearching.value = true;

    if (!states.value.google) {
      response.value.type = 'error';
      response.value.text = 'Google Maps API 加載失敗';
      isSearching.value = false;
      return;
    }

    const geocoder = new states.value.google.maps.Geocoder();

    // 使用地理編碼服務將地址轉換為地理座標
    await geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        // 獲取第一個結果的地理座標
        const { lat, lng } = results[0].geometry.location;

        // 設置座標
        coordinates.value = { lat: lat(), lng: lng() };

        response.value.type = 'success';
        response.value.text = '成功找到座標！';
        isSearching.value = false;
      } else {
        // 設置錯誤訊息
        coordinates.value = null; // 清空座標

        response.value.type = 'error';
        response.value.text = '無法找到該地址的座標';
        isSearching.value = false;
      }
    });
  };

  onMounted(async () => {
    // 創建一個新的 Loader 實例
    const loader = new Loader({
      apiKey: VITE_GOOGLE_MAP_API_KEY,
      version: 'weekly',
      libraries: ['places'],
      language: 'zh-TW'
    });

    states.value.google = await loader.load();
  });

  return { coordinates, response, isSearching, geocodeAddress };
}

<script setup>
import { SearchOutlined } from '@vicons/antd';
import {
  NButton,
  NDatePicker,
  NDynamicInput,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  NInputNumber,
  NModal,
  NRate,
  NSelect,
  NSwitch,
  NTabPane,
  NTabs,
  NUpload,
  useMessage,
} from 'naive-ui';
import { v4 } from 'uuid';
import { computed, ref, watch } from 'vue';

import Ckeditor from '@/components/Ckeditor.vue';
import { useGeocodeAddress } from '@/components/Map';
import { apiAdminUploadImage } from '@/utlis/api';
import { categoryMap, cityMap, unitMap } from '@/utlis/context';
import { mapToArray } from '@/utlis/global';

const { isNew, tempProduct = {} } = defineProps({
  isNew: Boolean,
  isLoading: Boolean,
  tempProduct: Object,
  showModal: Boolean,
});
const emit = defineEmits(['addProduct', 'updateProduct', 'uploadImage', 'update:showModal']);
const message = useMessage();
const { coordinates, response, isSearching, geocodeAddress } = useGeocodeAddress();

const formRef = ref(null);
const productValue = ref({
  id: '',
  title: '',
  city: null,
  address: '',
  category: null,
  unit: null,
  evaluate: 0,
  evaluateNum: 0,
  origin_price: 0,
  price: 0,
  date: Date.now(),
  description: '',
  is_enabled: false,
  imageUrl: '',
  imagesUrl: [],
  features: '',
  plans: [],
  content: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
});

// Naive Ui
const citySelectShow = ref(false);
const categorySelectShow = ref(false);
const unitSelectShow = ref(false);
function onCreate() {
  return {
    origin_price: 0,
    price: 0,
    content: '',
  };
}

const rules = computed(() => ({
  title: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入產品名稱',
  },
  city: {
    required: true,
    trigger: ['blur', 'change'],
    message: '請選擇產品城市',
  },
  address: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入產品地址',
  },
  category: {
    required: true,
    trigger: ['blur', 'change'],
    message: '請選擇產品分類',
  },
  unit: {
    required: true,
    trigger: ['blur', 'change'],
    message: '請選擇產品單位',
  },
  evaluate: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请滑動評價',
  },
  evaluateNum: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请輸入評價總人數',
  },
  origin_price: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请輸入產品原價',
  },
  price: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请輸入產品售價',
  },
  date: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请輸入產品售價',
  },
  description: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入產品描述',
  },
}));

const modalStatus = computed(() => `${isNew ? '新增' : '編輯'}`);
const getDefaultFileList = computed(() =>
  tempProduct?.imagesUrl?.map(imageUrl => ({
    id: v4(),
    name: `${tempProduct?.title} 的圖片`,
    status: 'finished',
    url: imageUrl,
  })),
);

function disablePreviousDate(ts) {
  return ts > Date.now();
}

function resetForm() {
  productValue.value = {
    title: '',
    city: null,
    address: '',
    category: null,
    unit: null,
    evaluate: 0,
    evaluateNum: 0,
    origin_price: 0,
    price: 0,
    date: Date.now(),
    description: '',
    is_enabled: false,
    features: '',
    plans: [],
    content: '',
    coordinates: {
      lat: 0,
      lng: 0,
    },
  };
}

async function customRequest({ file, onFinish, onError }) {
  const formData = new FormData();
  formData.append('file-to-upload', file.file);

  try {
    const res = await apiAdminUploadImage(formData);

    const {
      data: { imageUrl, success },
    } = res;

    if (success) {
      message.success('上傳成功');
      productValue.value.imagesUrl.push(imageUrl);
    }

    onFinish();
  }
  catch {
    message.error('上傳失敗');

    onError();
  }
}

function handleRemoveUploadFile(options) {
  productValue.value.imagesUrl = productValue.value.imagesUrl.filter(
    imageUrl => imageUrl !== options?.file?.url,
  );
}

async function handleGetGeometry(address) {
  if (address === '') {
    message.error('地址不得為空');
    return;
  }

  await geocodeAddress(address);

  const { lat, lng } = coordinates.value;

  productValue.value.coordinates = {
    lat,
    lng,
  };

  switch (response.value.type) {
    case 'success':
      message.success(response.value.text);
      break;
    default:
      message.error(response.value.text);
      break;
  }
}

function onSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      const data = {
        data: {
          ...productValue.value,
        },
      };
      const status = isNew ? 'addProduct' : 'updateProduct';
      console.log(status, data);
      emit(status, data);
    }
  });
}

watch(
  () => tempProduct,
  (curr) => {
    productValue.value = {
      id: curr?.id ?? '',
      title: curr?.title ?? '',
      city: curr?.city ?? null,
      address: curr?.address ?? '',
      category: curr?.category ?? null,
      unit: curr?.unit ?? null,
      evaluate: curr?.evaluate ?? 0,
      evaluateNum: curr?.evaluateNum ?? 0,
      origin_price: curr?.origin_price ?? 0,
      price: curr?.price ?? 0,
      date: Date.now(),
      description: curr?.description ?? '',
      is_enabled: curr?.is_enabled ?? false,
      features: curr.features,
      plans: curr?.plan ?? [],
      content: curr?.content ?? '',
      imageUrl: curr?.imageUrl ?? '',
      imagesUrl: curr?.imagesUrl ?? [],
      coordinates: curr?.coordinates ?? { lat: 0, lng: 0 },
    };
  },
  { deep: true },
);
</script>

<template>
  <NModal
    class="custom-card"
    preset="card"
    size="huge"
    style="width: 768px"
    :title="`${modalStatus}產品`"
    :bordered="false"
    :show="showModal"
    @update:show="(status) => $emit('update:showModal', status)"
    @after-leave="resetForm"
  >
    <div class="max-h-[500px] space-y-6 overflow-auto">
      <NForm ref="formRef" :model="productValue" :rules="rules">
        <NTabs type="line" animated>
          <NTabPane name="產品內容" display-directive="show:lazy" tab="產品內容">
            <NGrid :cols="2" :x-gap="24">
              <NFormItemGi :span="2" path="id" label="ID">
                <NInput type="text" placeholder="產品 ID" disabled :value="productValue.id" />
              </NFormItemGi>

              <NFormItemGi :span="2" path="title" label="名稱">
                <NInput
                  v-model:value="productValue.title"
                  type="text"
                  placeholder="輸入產品名稱"
                />
              </NFormItemGi>

              <NFormItemGi path="city" label="城市">
                <NSelect
                  v-model:show="citySelectShow"
                  v-model:value="productValue.city"
                  filterable
                  tag
                  placeholder="選擇產品城市"
                  :options="mapToArray(cityMap)"
                >
                  <template v-if="citySelectShow" #arrow>
                    <SearchOutlined />
                  </template>
                </NSelect>
              </NFormItemGi>

              <NFormItemGi path="address" label="地址">
                <NInputGroup>
                  <NInput
                    v-model:value="productValue.address"
                    type="text"
                    placeholder="輸入產品地址"
                    :disabled="isSearching"
                  />
                  <NButton
                    type="primary"
                    ghost
                    :loading="isSearching"
                    @click="handleGetGeometry(productValue.address)"
                  >
                    搜尋
                  </NButton>
                </NInputGroup>
              </NFormItemGi>

              <NFormItemGi path="category" label="分類">
                <NSelect
                  v-model:show="categorySelectShow"
                  v-model:value="productValue.category"
                  filterable
                  tag
                  placeholder="選擇產品分類"
                  :options="mapToArray(categoryMap)"
                >
                  <template v-if="categorySelectShow" #arrow>
                    <SearchOutlined />
                  </template>
                </NSelect>
              </NFormItemGi>

              <NFormItemGi path="unit" label="單位">
                <NSelect
                  v-model:show="unitSelectShow"
                  v-model:value="productValue.unit"
                  filterable
                  tag
                  placeholder="選擇產品單位"
                  :options="mapToArray(unitMap)"
                >
                  <template v-if="unitSelectShow" #arrow>
                    <SearchOutlined />
                  </template>
                </NSelect>
              </NFormItemGi>

              <NFormItemGi path="evaluate" label="評價">
                <NRate v-model:value="productValue.evaluate" allow-half />
              </NFormItemGi>

              <NFormItemGi path="evaluateNum" label="評價總人數">
                <NInputNumber
                  v-model:value="productValue.evaluateNum"
                  style="width: 100%"
                  placeholder="輸入產品評價總人數"
                  clearable
                  :min="0"
                />
              </NFormItemGi>

              <NFormItemGi path="origin_price" label="原價">
                <NInputNumber
                  v-model:value="productValue.origin_price"
                  style="width: 100%"
                  placeholder="輸入產品原價"
                  clearable
                  :min="0"
                  :show-button="false"
                >
                  <template #prefix>
                    $NT
                  </template>
                </NInputNumber>
              </NFormItemGi>

              <NFormItemGi path="price" label="售價">
                <NInputNumber
                  v-model:value="productValue.price"
                  style="width: 100%"
                  placeholder="輸入產品售價"
                  clearable
                  :min="0"
                  :show-button="false"
                >
                  <template #prefix>
                    $NT
                  </template>
                </NInputNumber>
              </NFormItemGi>

              <NFormItemGi path="date" label="上架日期">
                <NDatePicker
                  v-model:value="productValue.date"
                  type="date"
                  :is-date-disabled="disablePreviousDate"
                />
              </NFormItemGi>

              <NFormItemGi path="geometry" label="座標查詢">
                <NInputGroup>
                  <NInputGroupLabel>經度</NInputGroupLabel>
                  <NInputNumber
                    v-model:value="productValue.coordinates.lng"
                    :show-button="false"
                  />
                  <NInputGroupLabel>緯度</NInputGroupLabel>
                  <NInputNumber
                    v-model:value="productValue.coordinates.lat"
                    :show-button="false"
                  />
                </NInputGroup>
              </NFormItemGi>

              <NFormItemGi :span="2" path="description" label="描述">
                <NInput
                  v-model:value="productValue.description"
                  type="textarea"
                  :autosize="{
                    minRows: 3,
                    maxRows: 5,
                  }"
                  placeholder="請輸入產品描述"
                />
              </NFormItemGi>

              <NFormItemGi :span="2" path="is_enabled" label="啟用產品">
                <NSwitch v-model:value="productValue.is_enabled">
                  <template #checked>
                    啟用
                  </template>
                  <template #unchecked>
                    未啟用
                  </template>
                </NSwitch>
              </NFormItemGi>
            </NGrid>
          </NTabPane>
          <NTabPane name="圖片上傳" display-directive="show" tab="產品圖片">
            <NUpload
              list-type="image-card"
              :default-file-list="getDefaultFileList"
              :custom-request="customRequest"
              @remove="handleRemoveUploadFile"
            />
          </NTabPane>
          <NTabPane name="活動特色" display-directive="show" tab="產品特色">
            <Ckeditor v-model:value="productValue.features" />
          </NTabPane>
          <NTabPane name="活動方案" display-directive="show" tab="產品方案">
            <NDynamicInput v-model:value="productValue.plans" :on-create="onCreate">
              <template #create-button-default>
                創建方案
              </template>
              <template #default="{ value }">
                <div class="flex max-w-xl flex-col gap-4">
                  <div class="flex items-center gap-8">
                    <NInputNumber
                      v-model:value="value.origin_price"
                      placeholder="輸入原價"
                      :disabled="isSearching"
                      :loading="isSearching"
                    />
                    <NInputNumber
                      v-model:value="value.price"
                      placeholder="輸入售價"
                      :disabled="isSearching"
                      :loading="isSearching"
                    />
                  </div>
                  <Ckeditor v-model:value="value.content" />
                </div>
              </template>
            </NDynamicInput>
          </NTabPane>
          <NTabPane name="活動內容" display-directive="show" tab="產品內容">
            <Ckeditor v-model:value="productValue.content" />
          </NTabPane>
        </NTabs>
      </NForm>
    </div>
    <template #footer>
      <NButton type="primary" block ghost :loading="isLoading" @click="onSubmit">
        {{ `${modalStatus}${isLoading ? '中' : ''}` }}
      </NButton>
    </template>
  </NModal>
</template>

<style scoped>
#ckeditor :deep(.ck-editor__editable) {
  min-height: 200px;
  max-height: 500px;
}
</style>

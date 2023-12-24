<script setup lang="ts">
import { SearchOutlined } from '@vicons/antd';
import type {
  FormRules,
  UploadCustomRequestOptions,
  UploadFileInfo,
} from 'naive-ui';
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
import { computed, reactive, ref, watch } from 'vue';

import { useSearch } from '@voomap/core';
import Ckeditor from '@/components/Ckeditor.vue';
import { apiAdminUploadImage } from '@/utils/api';
import { categoryMap, cityMap, unitMap } from '@/utils/context';
import { mapToArray } from '@/utils/global';
import type { Product } from '@/types';

const { isNew, tempProduct } = defineProps<{
  isNew: boolean
  isLoading: boolean
  tempProduct: Product
  showModal: boolean
}>();

const emit = defineEmits<{
  addProduct: [product: Product]
  updateProduct: [product: Product]
  'update:showModal': [status: boolean]
}>();

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const message = useMessage();
const { isLoading: isSearching, coordinates, getCoordinates } = useSearch(VITE_GOOGLE_MAP_API_KEY);

const formRef = ref<InstanceType<typeof NForm>>();
const productValue: Product = reactive({
  id: '',
  title: '',
  city: '',
  address: '',
  category: '',
  unit: '',
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

const rules = computed<FormRules>(() => ({
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
  })) as UploadFileInfo[],
);

function disablePreviousDate(ts: number) {
  return ts > Date.now();
}

async function customRequest({ file, onFinish, onError }: UploadCustomRequestOptions) {
  const formData = new FormData();
  formData.append('file-to-upload', file.file as Blob);

  try {
    const res = await apiAdminUploadImage(formData);

    const {
      data: { imageUrl, success },
    } = res;

    if (success) {
      message.success('上傳成功');

      if (Array.isArray(productValue.imagesUrl))
        productValue.imagesUrl.push(imageUrl);
    }

    onFinish();
  }
  catch {
    message.error('上傳失敗');

    onError();
  }
}

async function handleAutoChange(address: string) {
  await getCoordinates(address);
  productValue.coordinates = { ...coordinates };
}

function handleRemoveUploadFile({ file }: { file: UploadFileInfo }) {
  productValue.imagesUrl = productValue?.imagesUrl?.filter(
    imageUrl => imageUrl !== file.url,
  );
}

function onSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (isNew)
        emit('addProduct', productValue);
      else
        emit('updateProduct', productValue);
    }
  });
}

watch(
  () => tempProduct,
  (curr) => {
    Object.assign(productValue, {
      id: curr?.id ?? '',
      title: curr?.title ?? '',
      city: curr?.city ?? '',
      address: curr?.address ?? '',
      category: curr?.category ?? '',
      unit: curr?.unit ?? '',
      evaluate: curr?.evaluate ?? 0,
      evaluateNum: curr?.evaluateNum ?? 0,
      origin_price: curr?.origin_price ?? 0,
      price: curr?.price ?? 0,
      date: isNew ? Date.now() : curr?.date,
      description: curr?.description ?? '',
      is_enabled: curr?.is_enabled ?? false,
      features: curr.features ?? [],
      plans: curr?.plans ?? [],
      content: curr?.content ?? '',
      imageUrl: curr?.imageUrl ?? '',
      imagesUrl: curr?.imagesUrl ?? [],
      coordinates: curr?.coordinates ?? {
        lat: 0,
        lng: 0,
      },
    });

    if (Array.isArray(productValue.imagesUrl) && productValue.imageUrl === '')
      productValue.imageUrl = productValue.imagesUrl[0];
  },
  { deep: true },
);
</script>

<template>
  <NModal
    style="width: 768px"
    class="custom-card"
    preset="card"
    size="huge"
    :title="`${modalStatus}產品`"
    :bordered="false"
    :show="showModal"
    :segmented="{
      content: 'soft',
      footer: false,
    }"
    @update:show="(status) => $emit('update:showModal', status)"
  >
    <div class="max-h-[500px] space-y-6 overflow-auto">
      <NForm ref="formRef" :model="productValue" :rules="rules">
        <NTabs type="line" animated>
          <NTabPane name="產品內容" display-directive="show:lazy" tab="產品內容">
            <NGrid :cols="2" :x-gap="24">
              <NFormItemGi :span="2" label="ID" path="id">
                <NInput type="text" placeholder="產品 ID" disabled :value="productValue.id" />
              </NFormItemGi>

              <NFormItemGi :span="2" label="名稱" path="title">
                <NInput
                  v-model:value="productValue.title"
                  type="text"
                  placeholder="輸入產品名稱"
                />
              </NFormItemGi>

              <NFormItemGi label="城市" path="city">
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

              <NFormItemGi label="地址" path="address">
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
                    @click="handleAutoChange(productValue.address)"
                  >
                    搜尋
                  </NButton>
                </NInputGroup>
              </NFormItemGi>

              <NFormItemGi label="分類" path="category">
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

              <NFormItemGi label="單位" path="unit">
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

              <NFormItemGi label="評價" path="evaluate">
                <NRate v-model:value="productValue.evaluate" allow-half />
              </NFormItemGi>

              <NFormItemGi label="評價總人數" path="evaluateNum">
                <NInputNumber
                  v-model:value="productValue.evaluateNum"
                  style="width: 100%"
                  placeholder="輸入產品評價總人數"
                  clearable
                  :min="0"
                />
              </NFormItemGi>

              <NFormItemGi label="原價" path="origin_price">
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

              <NFormItemGi label="售價" path="price">
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

              <NFormItemGi label="上架日期" path="date">
                <NDatePicker
                  v-model:value="productValue.date"
                  type="date"
                  :is-date-disabled="disablePreviousDate"
                />
              </NFormItemGi>

              <NFormItemGi label="座標查詢" path="geometry">
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

              <NFormItemGi :span="2" label="描述" path="description">
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

              <NFormItemGi label="啟用產品" path="is_enabled">
                <NSwitch v-model:value="productValue.is_enabled">
                  <template #checked>
                    啟用
                  </template>
                  <template #unchecked>
                    未啟用
                  </template>
                </NSwitch>
              </NFormItemGi>
              <NFormItemGi label="加入收藏" path="is_favorite">
                <NSwitch>
                  <template #icon>
                    ❤️
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
          <NTabPane v-if="typeof productValue.features !== 'undefined'" name="活動特色" display-directive="show" tab="產品特色">
            <Ckeditor v-model:value="productValue.features" />
          </NTabPane>
          <NTabPane name="活動方案" display-directive="show" tab="產品方案">
            <NDynamicInput v-model:value="productValue.plans" :on-create="onCreate">
              <template #create-button-default>
                創建方案
              </template>
              <template #default="{ value }">
                <div class="flex max-w-xl flex-col gap-4">
                  <NInput
                    v-model:value="value.title"
                    type="text"
                    placeholder="方案名稱"
                    :loading="isLoading"
                    :disabled="isLoading"
                  />
                  <div class="flex items-center gap-8">
                    <NInputNumber
                      v-model:value="value.origin_price"
                      placeholder="輸入原價"
                      :loading="isLoading"
                      :disabled="isLoading"
                    />
                    <NInputNumber
                      v-model:value="value.price"
                      placeholder="輸入售價"
                      :loading="isLoading"
                      :disabled="isLoading"
                    />
                  </div>
                  <Ckeditor v-model:value="value.content" />
                </div>
              </template>
            </NDynamicInput>
          </NTabPane>
          <NTabPane v-if="typeof productValue.content !== 'undefined'" name="活動內容" display-directive="show" tab="產品內容">
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

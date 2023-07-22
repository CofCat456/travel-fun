<script setup>
import { SearchOutline as SearchIcon } from '@vicons/ionicons5';
import {
  NButton,
  NDatePicker,
  NDynamicInput,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NInputNumber,
  NModal,
  NRate,
  NSelect,
  NSwitch,
  NTabPane,
  NTabs,
  NUpload,
  useMessage
} from 'naive-ui';
import { v4 } from 'uuid';
import { computed, ref, watch } from 'vue';

import Ckeditor from '@/components/Ckeditor.vue';
import { apiAdminUploadImage } from '@/utlis/api';
import { categoryMap, cityMap, unitMap } from '@/utlis/context';
import { mapToArray } from '@/utlis/global';

const message = useMessage();

const props = defineProps({
  isNew: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  tempProduct: {
    type: Object,
    default: () => {}
  },
  showModal: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['addProduct', 'updateProduct', 'uploadImage', 'update:showModal']);

const tempUploadFileInfo = ref([]);

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
  content: ''
});

// Naive Ui
const citySelectShow = ref(false);
const categorySelectShow = ref(false);
const unitSelectShow = ref(false);
const onCreate = () => ({
  origin_price: 0,
  price: 0,
  content: ''
});

const rules = computed(() => ({
  title: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入產品名稱'
  },
  city: {
    required: true,
    trigger: ['blur', 'change'],
    message: '請選擇產品城市'
  },
  address: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入產品地址'
  },
  category: {
    required: true,
    trigger: ['blur', 'change'],
    message: '請選擇產品分類'
  },
  unit: {
    required: true,
    trigger: ['blur', 'change'],
    message: '請選擇產品單位'
  },
  evaluate: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请滑動評價'
  },
  evaluateNum: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请輸入評價總人數'
  },
  origin_price: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请輸入產品原價'
  },
  price: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请輸入產品售價'
  },
  date: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请輸入產品售價'
  },
  description: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入產品描述'
  }
}));

const modalStatus = computed(() => `${props.isNew ? '新增' : '編輯'}`);
const getDefaultFileList = computed(() =>
  props.tempProduct?.imagesUrl?.map((imageUrl) => ({
    id: v4(),
    name: `${props.tempProduct?.title} 的圖片`,
    status: 'finished',
    url: imageUrl
  }))
);

const disablePreviousDate = (ts) => {
  return ts > Date.now();
};

const resetForm = () => {
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
    content: ''
  };

  tempUploadFileInfo.value = [];
};

const customRequest = async ({ file, onFinish, onError }) => {
  const formData = new FormData();
  formData.append('file-to-upload', file.file);

  try {
    const res = await apiAdminUploadImage(formData);

    const {
      data: { imageUrl, success }
    } = res;

    if (success) {
      message.success('上傳成功');
      productValue.value.imagesUrl.push(imageUrl);
    }

    onFinish();
  } catch {
    message.error('上傳失敗');

    onError();
  }
};

const handleRemoveUploadFile = (options) => {
  productValue.value.imagesUrl = productValue.value.imagesUrl.filter(
    (imageUrl) => imageUrl !== options?.file?.url
  );
};

const onSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      const data = {
        data: {
          ...productValue.value
        }
      };
      const status = props.isNew ? 'addProduct' : 'updateProduct';
      console.log(status, data);
      emit(status, data);
    }
  });
};

watch(
  () => props.tempProduct,
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
      imagesUrl: curr?.imagesUrl ?? []
    };
  },
  { deep: true }
);
</script>

<template>
  <n-modal
    class="custom-card"
    preset="card"
    size="huge"
    style="width: 768px"
    :title="`${modalStatus}產品`"
    :bordered="false"
    :show="showModal"
    @update:show="$emit('update:showModal')"
    @after-leave="resetForm"
  >
    <div class="max-h-[500px] space-y-6 overflow-auto">
      <n-form ref="formRef" :model="productValue" :rules="rules">
        <n-tabs type="line" animated>
          <n-tab-pane name="產品內容" display-directive="show:lazy" tab="產品內容">
            <n-grid :cols="2" :x-gap="24">
              <n-form-item-gi :span="2" path="id" label="ID">
                <n-input type="text" placeholder="產品 ID" disabled :value="productValue.id" />
              </n-form-item-gi>

              <n-form-item-gi :span="2" path="title" label="名稱">
                <n-input
                  type="text"
                  placeholder="輸入產品名稱"
                  @keydown.enter.prevent
                  v-model:value="productValue.title"
                />
              </n-form-item-gi>

              <n-form-item-gi path="city" label="城市">
                <n-select
                  filterable
                  tag
                  placeholder="選擇產品城市"
                  :options="mapToArray(cityMap)"
                  v-model:show="citySelectShow"
                  v-model:value="productValue.city"
                >
                  <template v-if="citySelectShow" #arrow>
                    <search-icon />
                  </template>
                </n-select>
              </n-form-item-gi>

              <n-form-item-gi path="address" label="地址">
                <n-input
                  type="text"
                  placeholder="輸入產品地址"
                  @keydown.enter.prevent
                  v-model:value="productValue.address"
                />
              </n-form-item-gi>

              <n-form-item-gi path="category" label="分類">
                <n-select
                  filterable
                  tag
                  placeholder="選擇產品分類"
                  :options="mapToArray(categoryMap)"
                  v-model:show="categorySelectShow"
                  v-model:value="productValue.category"
                >
                  <template v-if="categorySelectShow" #arrow>
                    <search-icon />
                  </template>
                </n-select>
              </n-form-item-gi>

              <n-form-item-gi path="unit" label="單位">
                <n-select
                  filterable
                  tag
                  placeholder="選擇產品單位"
                  :options="mapToArray(unitMap)"
                  v-model:show="unitSelectShow"
                  v-model:value="productValue.unit"
                >
                  <template v-if="unitSelectShow" #arrow>
                    <search-icon />
                  </template>
                </n-select>
              </n-form-item-gi>

              <n-form-item-gi path="evaluate" label="評價">
                <n-rate allow-half v-model:value="productValue.evaluate" />
              </n-form-item-gi>

              <n-form-item-gi path="evaluateNum" label="評價總人數">
                <n-input-number
                  style="width: 100%"
                  placeholder="輸入產品評價總人數"
                  clearable
                  :min="0"
                  v-model:value="productValue.evaluateNum"
                />
              </n-form-item-gi>

              <n-form-item-gi path="origin_price" label="原價">
                <n-input-number
                  style="width: 100%"
                  placeholder="輸入產品原價"
                  clearable
                  :min="0"
                  :show-button="false"
                  v-model:value="productValue.origin_price"
                >
                  <template #prefix> $NT </template>
                </n-input-number>
              </n-form-item-gi>

              <n-form-item-gi path="price" label="售價">
                <n-input-number
                  style="width: 100%"
                  placeholder="輸入產品售價"
                  clearable
                  :min="0"
                  :show-button="false"
                  v-model:value="productValue.price"
                >
                  <template #prefix> $NT </template>
                </n-input-number>
              </n-form-item-gi>

              <n-form-item-gi path="date" label="上架日期">
                <n-date-picker
                  type="date"
                  :is-date-disabled="disablePreviousDate"
                  v-model:value="productValue.date"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="2" path="description" label="描述">
                <n-input
                  type="textarea"
                  :autosize="{
                    minRows: 3,
                    maxRows: 5
                  }"
                  placeholder="請輸入產品描述"
                  v-model:value="productValue.description"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="2" path="is_enabled" label="啟用產品">
                <n-switch v-model:value="productValue.is_enabled">
                  <template #checked> 啟用 </template>
                  <template #unchecked> 未啟用 </template>
                </n-switch>
              </n-form-item-gi>
            </n-grid>
          </n-tab-pane>
          <n-tab-pane name="圖片上傳" display-directive="show" tab="產品圖片">
            <n-upload
              list-type="image-card"
              :default-file-list="getDefaultFileList"
              :custom-request="customRequest"
              @remove="handleRemoveUploadFile"
            />
          </n-tab-pane>
          <n-tab-pane name="活動特色" display-directive="show" tab="產品特色">
            <Ckeditor v-model:value="productValue.features" />
          </n-tab-pane>
          <n-tab-pane name="活動方案" display-directive="show" tab="產品方案">
            <n-dynamic-input v-model:value="productValue.plans" :on-create="onCreate">
              <template #create-button-default> 創建方案 </template>
              <template #default="{ value }">
                <div class="flex max-w-xl flex-col gap-4">
                  <div class="flex items-center gap-8">
                    <n-input-number placeholder="輸入原價" v-model:value="value.origin_price" />
                    <n-input-number placeholder="輸入售價" v-model:value="value.price" />
                  </div>
                  <Ckeditor v-model:value="value.content" />
                </div>
              </template>
            </n-dynamic-input>
          </n-tab-pane>
          <n-tab-pane name="活動內容" display-directive="show" tab="產品內容">
            <Ckeditor v-model:value="productValue.content" />
          </n-tab-pane>
        </n-tabs>
      </n-form>
    </div>
    <template #footer>
      <n-button type="primary" block ghost :loading="isLoading" @click="onSubmit">
        {{ `${modalStatus}${isLoading ? '中' : ''}` }}
      </n-button>
    </template>
  </n-modal>
</template>

<style scoped>
#ckeditor :deep(.ck-editor__editable) {
  min-height: 200px;
  max-height: 500px;
}
</style>

<script setup>
import { ref, computed, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

import Modal from './Modal.vue';
import SwiperPhoto from '../Swiper/SwiperPhoto.vue';

import { categoryList, cityMap, unitList } from '../../utlis/context';

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  noScroll: {
    type: Boolean,
    default: false
  },
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
  tempImageUrl: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['closing', 'addProduct', 'updateProduct', 'uploadImage']);

const fileInputRef = ref(null);
const isShowDetail = ref(true);
const tempImagesUrl = ref([]);
const activeImageIndex = ref(0);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    category: yup.string().required(),
    unit: yup.string().required(),
    evaluate: yup.number().min(0),
    evaluateNum: yup.number().min(0),
    origin_price: yup.number().min(0).required(),
    price: yup.number().min(0).required(),
    description: yup.string().max(300)
  })
});

const { value: title } = useField('title');
const { value: city } = useField('city');
const { value: address } = useField('address');
const { value: category } = useField('category');
const { value: unit } = useField('unit');
const { value: evaluate } = useField('evaluate');
const { value: evaluateNum } = useField('evaluateNum');
const { value: origin_price } = useField('origin_price');
const { value: price } = useField('price');
const { value: description } = useField('description');

const isTitleError = computed(() => Object.hasOwn(errors.value, 'title'));
const isCityError = computed(() => Object.hasOwn(errors.value, 'city'));
const isAddressError = computed(() => Object.hasOwn(errors.value, 'address'));
const isCategoryError = computed(() => Object.hasOwn(errors.value, 'category'));
const isUnitError = computed(() => Object.hasOwn(errors.value, 'unit'));
const isOriginPriceError = computed(() => Object.hasOwn(errors.value, 'origin_price'));
const isPriceError = computed(() => Object.hasOwn(errors.value, 'price'));

const onSubmit = handleSubmit((values) => {
  const data = { data: { ...props.tempProduct, ...values, imagesUrl: tempImagesUrl.value } };
  const status = props.isNew ? 'addProduct' : 'updateProduct';
  emit(status, data);
});

const modalStatus = computed(() => `${props.isNew ? '新增' : '編輯'}`);

const modalTitle = computed(() => `${modalStatus.value}產品`);

const modalButtonText = computed(() => `${modalStatus.value}${props.isLoading ? '中' : ''}`);

const cityList = computed(() => [...cityMap.values()]);

const canUpdatePhoto = computed(() => {
  return activeImageIndex.value < tempImagesUrl.value.length;
});

const closeModal = () => {
  emit('closing');
  resetForm();
};

const openFileHandler = () => {
  fileInputRef.value.click();
};

const imageUploadHandler = (event) => {
  const uploadedFile = event.target.files[0];
  if (typeof uploadedFile === 'undefined') return;

  const formData = new FormData();
  formData.append('file-to-upload', uploadedFile);
  emit('uploadImage', formData);
};

const updateIndexHandler = (index) => {
  activeImageIndex.value = index;
};

const detailHandler = (status = false) => {
  isShowDetail.value = status;
};

const addImage = (activeIndex, imageUrl) => {
  tempImagesUrl.value.splice(activeIndex, 0, imageUrl);
};

const changeImage = (activeIndex, imageUrl) => {
  if (!canUpdatePhoto.value) return;

  tempImagesUrl.value.splice(activeIndex, 1, imageUrl);
};

const deleteImage = (activeIndex) => {
  if (!canUpdatePhoto.value) return;

  tempImagesUrl.value.splice(activeIndex, 1);
};

watch(
  () => props.tempProduct,
  (currTempProduct) => {
    title.value = currTempProduct?.title;
    city.value = currTempProduct?.city;
    address.value = currTempProduct?.address;
    category.value = currTempProduct?.category;
    unit.value = currTempProduct?.unit;
    evaluate.value = currTempProduct?.evaluate ?? 0;
    evaluateNum.value = currTempProduct?.evaluateNum ?? 0;
    origin_price.value = currTempProduct?.origin_price;
    price.value = currTempProduct?.price;
    description.value = currTempProduct?.description;
    tempImagesUrl.value = [...(currTempProduct?.imagesUrl ?? [])];
  },
  { deep: true }
);

watch(
  () => props.tempImageUrl,
  (currTempImageUrl) => {
    if (canUpdatePhoto.value) {
      changeImage(activeImageIndex.value, currTempImageUrl);
    } else {
      addImage(activeImageIndex.value, currTempImageUrl);
    }
  }
);
</script>

<template>
  <Modal :no-scroll="noScroll" :showModal="showModal" @closing="closeModal">
    <template v-slot:content>
      <div class="w-[768px] space-y-6 p-5">
        <div class="flex w-full items-center justify-between">
          <h4 class="font-bold">{{ modalTitle }}</h4>
          <button type="button" @click="closeModal">
            <span class="material-icons-outlined icon-hover align-top text-cc-other-2">
              close
            </span>
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="space-x-3">
            <button type="button" @click="detailHandler(true)">
              <span class="material-icons-outlined icon-hover align-middle text-cc-other-2"
                >assignment</span
              >
            </button>
            <button type="button" @click="detailHandler()">
              <span class="material-icons-outlined icon-hover align-middle text-cc-other-2"
                >collections</span
              >
            </button>
          </div>
          <div v-if="isShowDetail === false" class="space-x-3">
            <button type="button" :disabled="canUpdatePhoto === false" @click="openFileHandler">
              <span class="material-icons-outlined icon-hover align-middle text-cc-other-2"
                >repeat</span
              >
            </button>
            <button
              type="button"
              :disabled="canUpdatePhoto === false"
              @click="deleteImage(activeImageIndex)"
            >
              <span class="material-icons-outlined icon-hover align-middle text-cc-other-2"
                >close</span
              >
            </button>
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <form v-if="isShowDetail" class="space-y-4" @submit="onSubmit">
            <div class="-space-y-px rounded-md">
              <div class="mb-5">
                <label for="title-input" class="mb-2 block text-sm font-medium">名稱</label>
                <input
                  id="title-input"
                  type="text"
                  autofocus
                  class="border-1 relative block w-full rounded-m p-2.5 ring-1 ring-inset focus:z-10 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                  :class="
                    isTitleError
                      ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                  "
                  placeholder="請輸入產品名稱"
                  v-model="title"
                />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="mb-5">
                  <label for="city-input" class="mb-2 block text-sm font-medium">城市</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5 text-cc-other-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                    <input
                      id="city-input"
                      type="text"
                      list="city-list"
                      class="border-1 relative block w-full rounded-m p-2.5 pl-10 ring-1 ring-inset focus:z-10 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                      :class="
                        isCityError
                          ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                      "
                      placeholder="請輸入產品城市"
                      v-model="city"
                    />
                    <datalist id="city-list">
                      <option v-for="value in cityList" :key="value" :value="value" />
                    </datalist>
                  </div>
                </div>

                <div class="mb-5">
                  <label for="address-input" class="mb-2 block text-sm font-medium">地點</label>
                  <input
                    id="address-input"
                    type="text"
                    autofocus
                    class="border-1 relative block w-full rounded-m p-2.5 ring-1 ring-inset focus:z-10 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                    :class="
                      isAddressError
                        ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                    "
                    placeholder="請輸入產品地點"
                    v-model="address"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="mb-5">
                  <label for="category-input" class="mb-2 block text-sm font-medium">分類</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5 text-cc-other-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                    <input
                      id="category-input"
                      type="text"
                      list="category-list"
                      class="border-1 relative block w-full rounded-m p-2.5 pl-10 ring-1 ring-inset focus:z-10 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                      :class="
                        isCategoryError
                          ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                      "
                      placeholder="請輸入產品分類"
                      v-model="category"
                    />
                    <datalist id="category-list">
                      <option v-for="value in categoryList" :key="value" :value="value" />
                    </datalist>
                  </div>
                </div>

                <div class="mb-5">
                  <label for="unit-input" class="mb-2 block text-sm font-medium">單位</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5 text-cc-other-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                    <input
                      id="unit-input"
                      type="text"
                      list="unit-list"
                      class="border-1 relative block w-full rounded-m p-2.5 pl-10 ring-1 ring-inset focus:z-10 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                      :class="
                        isUnitError
                          ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                      "
                      placeholder="請輸入產品單位"
                      v-model="unit"
                    />
                    <datalist id="unit-list">
                      <option v-for="value in unitList" :key="value" :value="value" />
                    </datalist>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="mb-5">
                  <label for="origin-price-range" class="mb-2 block text-sm font-medium"
                    >評價
                    <span class="text-cc-primary">{{ `(${evaluate})` }}</span>
                  </label>
                  <input
                    id="evaluate-range"
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    class="mb-6 h-1 w-full cursor-grab appearance-none rounded-lg bg-cc-other-3 accent-cc-primary"
                    v-model="evaluate"
                  />
                </div>

                <div class="mb-5">
                  <label for="evaluate-num-input" class="mb-2 block text-sm font-medium"
                    >評價人數</label
                  >
                  <input
                    id="evaluate-num-input"
                    type="number"
                    class="border-1 relative block w-full rounded-m border-transparent p-2.5 ring-1 ring-inset ring-cc-other-5 placeholder:text-cc-other-4 focus:z-10 focus:ring-1 focus:ring-inset focus:ring-cc-primary sm:text-sm sm:leading-[1.5]"
                    placeholder="請輸入產品評價人數"
                    v-model="evaluateNum"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="mb-5">
                  <label for="origin-price-input" class="mb-2 block text-sm font-medium"
                    >原價</label
                  >
                  <input
                    id="origin-price-input"
                    type="number"
                    class="border-1 relative block w-full rounded-m p-2.5 ring-1 ring-inset focus:z-10 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                    :class="
                      isOriginPriceError
                        ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                    "
                    placeholder="請輸入產品原價"
                    v-model="origin_price"
                  />
                </div>

                <div class="mb-5">
                  <label for="price-input" class="mb-2 block text-sm font-medium">售價</label>
                  <input
                    id="price-input"
                    type="number"
                    class="border-1 relative block w-full rounded-m p-2.5 ring-1 ring-inset focus:z-10 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                    :class="
                      isPriceError
                        ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                    "
                    placeholder="請輸入產品售價"
                    v-model="price"
                  />
                </div>
              </div>

              <div class="mb-5">
                <label for="description-input" class="mb-2 block text-sm font-medium">描述</label>
                <textarea
                  id="description-input"
                  class="border-1 relative block w-full rounded-m border-transparent p-2.5 ring-1 ring-inset ring-cc-other-5 placeholder:text-cc-other-4 focus:z-10 focus:ring-1 focus:ring-inset focus:ring-cc-primary sm:text-sm sm:leading-[1.5]"
                  placeholder="請輸入產品描述"
                  v-model="description"
                />
              </div>
            </div>
            <button
              type="submit"
              class="btn group relative flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed"
              :disabled="isLoading"
            >
              <svg
                v-if="isLoading"
                class="h-6 w-6 animate-spin py-1 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ modalButtonText }}
            </button>
          </form>
          <SwiperPhoto
            v-else
            :images-url="tempImagesUrl"
            @open-file-input="openFileHandler"
            @update-active-index="updateIndexHandler"
          />
        </transition>
      </div>
      <input ref="fileInputRef" type="file" class="hidden" @change="imageUploadHandler" />
    </template>
  </Modal>
</template>

<style scoped>
input::-webkit-calendar-picker-indicator {
  display: none !important;
  -webkit-appearance: none !important;
}
</style>

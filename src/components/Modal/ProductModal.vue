<script setup>
import 'v-calendar/style.css';

import { DatePicker } from 'v-calendar';
import { useField, useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import * as yup from 'yup';

import { categoryMap, cityMap, unitList } from '../../utlis/context';
import Button from '../Base/Button.vue';
import SwiperPhoto from '../Swiper/SwiperPhoto.vue';
import Modal from './Modal.vue';

const props = defineProps({
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

const emit = defineEmits(['addProduct', 'updateProduct', 'uploadImage']);

const isShowDetail = ref(true);
const tempPreferImageUrl = ref('');
const tempImagesUrl = ref([]);
const activeImageIndex = ref(0);
const date = ref(new Date());
const fileInputRef = ref(null);
const modalRef = ref(null);

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
    description: yup.string().max(300),
    is_enabled: yup.boolean()
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
const { value: is_enabled } = useField('is_enabled');

const isCityError = computed(() => Object.hasOwn(errors.value, 'city'));
const isAddressError = computed(() => Object.hasOwn(errors.value, 'address'));
const isCategoryError = computed(() => Object.hasOwn(errors.value, 'category'));
const isUnitError = computed(() => Object.hasOwn(errors.value, 'unit'));
const isOriginPriceError = computed(() => Object.hasOwn(errors.value, 'origin_price'));
const isPriceError = computed(() => Object.hasOwn(errors.value, 'price'));

const onSubmit = handleSubmit((values) => {
  const data = {
    data: {
      ...props.tempProduct,
      ...values,
      date: date.value,
      imageUrl: tempPreferImageUrl.value,
      imagesUrl: tempImagesUrl.value
    }
  };
  const status = props.isNew ? 'addProduct' : 'updateProduct';
  emit(status, data);
});

const modalStatus = computed(() => `${props.isNew ? '新增' : '編輯'}`);

const dateText = computed(
  () => `${date.value.getFullYear()} 年 ${date.value.getMonth() + 1} 月 ${date.value.getDate()} 日`
);

const isPreferred = computed(
  () => tempPreferImageUrl.value === tempImagesUrl.value[activeImageIndex.value] ?? ''
);

const canUpdatePhoto = computed(() => {
  return activeImageIndex.value < tempImagesUrl.value.length;
});

const openModal = () => {
  modalRef.value.show();
};

const hideModal = () => {
  modalRef.value.hide();
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

const changePrefer = (activeIndex) => {
  tempPreferImageUrl.value = tempImagesUrl.value[activeIndex];
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
    date.value = new Date();
    description.value = currTempProduct?.description;
    tempImagesUrl.value = [...(currTempProduct?.imagesUrl ?? [])];
    tempPreferImageUrl.value = currTempProduct?.imageUrl ?? tempImagesUrl.value[0] ?? '';
    is_enabled.value = currTempProduct?.is_enabcurrTempProduct?.dateled ?? true;
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

defineExpose({
  openModal,
  hideModal
});
</script>

<template>
  <Modal ref="modalRef" :no-scroll="noScroll" @hiding="resetForm()">
    <template #header>
      <div class="flex items-center justify-between">
        <h4 class="font-bold">{{ `${modalStatus}產品` }}</h4>
        <button type="button" @click="hideModal">
          <span class="material-icons-outlined icon-hover align-top text-cc-other-2"> close </span>
        </button>
      </div>
    </template>
    <template #content>
      <div class="max-h-[500px] space-y-6 overflow-auto">
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
            <button
              type="button"
              :disabled="canUpdatePhoto === false"
              @click="changePrefer(activeImageIndex)"
            >
              <span
                class="material-icons-outlined icon-hover align-middle"
                :class="isPreferred ? 'text-cc-accent' : 'text-cc-other-2'"
                >image</span
              >
            </button>
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
          <form v-if="isShowDetail" class="space-y-4">
            <div class="space-y-4 rounded-md">
              <div>
                <label for="title-input" class="mb-2 block text-sm font-medium">名稱</label>
                <input
                  id="title-input"
                  type="text"
                  autofocus
                  class="border-1 relative block w-full rounded-m p-2.5 ring-1 ring-inset focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                  placeholder="請輸入產品名稱"
                  v-model="title"
                />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label for="city-input" class="mb-2 block text-sm font-medium">城市</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 z-[5] flex items-center pl-3"
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
                      class="border-1 relative block w-full rounded-m p-2.5 pl-10 ring-1 ring-inset focus:z-[4] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                      :class="
                        isCityError
                          ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                      "
                      placeholder="請輸入產品城市"
                      v-model="city"
                    />
                    <datalist id="city-list">
                      <option v-for="[key, value] in cityMap" :key="key" :value="key">
                        {{ value }}
                      </option>
                    </datalist>
                  </div>
                </div>

                <div>
                  <label for="address-input" class="mb-2 block text-sm font-medium">地點</label>
                  <input
                    id="address-input"
                    type="text"
                    autofocus
                    class="border-1 relative block w-full rounded-m p-2.5 ring-1 ring-inset focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
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
                <div>
                  <label for="category-input" class="mb-2 block text-sm font-medium">分類</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 z-[5] flex items-center pl-3"
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
                      class="border-1 relative block w-full rounded-m p-2.5 pl-10 ring-1 ring-inset focus:z-[4] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                      :class="
                        isCategoryError
                          ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                      "
                      placeholder="請輸入產品分類"
                      v-model="category"
                    />
                    <datalist id="category-list">
                      <option
                        v-for="value in [...categoryMap.values()]"
                        :key="value"
                        :value="value"
                      />
                    </datalist>
                  </div>
                </div>

                <div>
                  <label for="unit-input" class="mb-2 block text-sm font-medium">單位</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 z-[5] flex items-center pl-3"
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
                      class="border-1 relative block w-full rounded-m p-2.5 pl-10 ring-1 ring-inset focus:z-[4] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
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
                <div>
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
                    v-model.number="evaluate"
                  />
                </div>

                <div>
                  <label for="evaluate-num-input" class="mb-2 block text-sm font-medium"
                    >評價人數</label
                  >
                  <input
                    id="evaluate-num-input"
                    type="number"
                    class="border-1 relative block w-full rounded-m border-transparent p-2.5 ring-1 ring-inset ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-1 focus:ring-inset focus:ring-cc-primary sm:text-sm sm:leading-[1.5]"
                    placeholder="請輸入產品評價人數"
                    v-model="evaluateNum"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label for="origin-price-input" class="mb-2 block text-sm font-medium"
                    >原價</label
                  >
                  <input
                    id="origin-price-input"
                    type="number"
                    class="border-1 relative block w-full rounded-m p-2.5 ring-1 ring-inset focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
                    :class="
                      isOriginPriceError
                        ? 'border-red-500 text-red-900 placeholder-red-700 ring-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-transparent ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-cc-primary'
                    "
                    placeholder="請輸入產品原價"
                    v-model="origin_price"
                  />
                </div>

                <div>
                  <label for="price-input" class="mb-2 block text-sm font-medium">售價</label>
                  <input
                    id="price-input"
                    type="number"
                    class="border-1 relative block w-full rounded-m p-2.5 ring-1 ring-inset focus:ring-1 focus:ring-inset sm:text-sm sm:leading-[1.5]"
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

              <div class="w-1/4 space-y-2">
                <label for="description-input" class="block text-sm font-medium">上架日期</label>
                <DatePicker :max-date="new Date()" v-model="date">
                  <template #default="{ togglePopover }">
                    <div class="flex overflow-hidden rounded-m border">
                      <button
                        type="button"
                        class="flex items-center justify-center border-r px-2 text-cc-primary hover:bg-cc-other-6"
                        @click="() => togglePopover()"
                      >
                        <span class="material-icons-outlined">edit_calendar</span>
                      </button>
                      <input
                        id="date-input"
                        type="text"
                        class="without-ring relative block w-full rounded-r-m border-transparent p-2.5 sm:text-sm sm:leading-[1.5]"
                        placeholder="請輸入上架時間"
                        readonly
                        :value="dateText"
                      />
                    </div>
                  </template>
                </DatePicker>
              </div>

              <div>
                <label for="description-input" class="mb-2 block text-sm font-medium">描述</label>
                <textarea
                  id="description-input"
                  class="border-1 relative block w-full rounded-m border-transparent p-2.5 ring-1 ring-inset ring-cc-other-5 placeholder:text-cc-other-4 focus:ring-1 focus:ring-inset focus:ring-cc-primary sm:text-sm sm:leading-[1.5]"
                  placeholder="請輸入產品描述"
                  v-model="description"
                />
              </div>

              <div class="flex items-center">
                <input id="enabled-checkbox" type="checkbox" class="h-5 w-5" v-model="is_enabled" />
                <label for="enabled-checkbox" class="ml-2 cursor-pointer text-sm font-medium"
                  >是否啟用</label
                >
              </div>
            </div>
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
    <template #footer>
      <Button type="submit" class="group" is-full :is-loading="isLoading" @click="onSubmit">
        {{ `${modalStatus}${isLoading ? '中' : ''}` }}
      </Button>
    </template>
  </Modal>
</template>

<style scoped>
input::-webkit-calendar-picker-indicator {
  display: none !important;
  -webkit-appearance: none !important;
}

:deep(.modal-window) {
  @apply rounded-m;
}
</style>

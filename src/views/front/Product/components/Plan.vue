<script setup>
import 'v-calendar/style.css';

import { DatePicker } from 'v-calendar';
import { computed, ref } from 'vue';

import Button from '@/components/Base/Button.vue';
import Title from '@/components/Title.vue';
import Container from '@/Layout/Container.vue';
import { currency } from '@/utlis/global';

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  origin_price: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: ''
  },
  adding: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['addCart']);

const date = ref(new Date());
const qty = ref(1);
const showDetail = ref(false);

const getTotal = computed(() => currency(qty.value * props.price, 'NT$ '));
const getSelectBtnText = computed(() => (showDetail.value ? '取消選擇' : '選擇'));

function toggleShowDetail() {
  showDetail.value = !showDetail.value;
}

function increment() {
  qty.value += 1;
}

function decrement() {
  if (qty.value === 1) return;

  qty.value -= 1;
}

const addCart = () => {
  const data = { product_id: props.id, qty: qty.value, buy_date: date.value };
  emit('addCart', { data });
};
</script>

<template>
  <div id="plan" class="bg-cc-other-7/80 py-10">
    <Container>
      <Title page title="選擇方案" />
      <div
        class="bordr mb-4 rounded-m border-cc-other-5/50 bg-cc-other-1"
        :class="showDetail && 'shadow-xl'"
      >
        <div class="flex gap-4 px-5 py-4">
          <div class="flex-1">
            <h4 class="mb-5 font-bold">方案名稱</h4>
            <ul class="list-disc pl-6 text-base tracking-wide">
              <li class="py-1">一整天的活動，包括觀光、戶外活動、美味的在地餐點等。</li>
              <li class="py-1">特別安排觀賞美麗的鶯歌景觀，體驗不一樣的自然風光。</li>
              <li class="py-1">提供專業的導遊，講解鶯歌的生態與歷史。</li>
              <li class="py-1">多種戶外活動可供選擇，徒步旅行、騎單車、釣魚等。</li>
              <li class="py-1">一整天的活動，包括觀光、戶外活動、美味的在地餐點等。</li>
              <li class="py-1">特別安排觀賞美麗的鶯歌景觀，體驗不一樣的自然風光。</li>
              <li class="py-1">提供專業的導遊，講解鶯歌的生態與歷史。</li>
              <li class="py-1">多種戶外活動可供選擇，徒步旅行、騎單車、釣魚等。</li>
            </ul>
          </div>
          <div class="flex items-end">
            <div class="mr-4 whitespace-nowrap text-right">
              <h5 class="font-bold">
                {{ currency(price, 'NT$ ') }}
              </h5>
              <span class="text-sm text-cc-other-4 line-through">
                {{ currency(origin_price, 'NT$ ') }}
              </span>
            </div>
            <Button @click="toggleShowDetail">
              {{ getSelectBtnText }}
            </Button>
          </div>
        </div>
        <div v-if="showDetail" class="border-cc-5/50 border-t p-5">
          <div class="my-3">
            <h5 class="text-base font-bold">選擇日期、選項</h5>
          </div>
          <div class="flex gap-8">
            <div class="w-1/2">
              <span class="mb-2 block text-sm text-cc-other-9">請選擇出發日期</span>
              <DatePicker expanded :min-date="new Date()" v-model="date" />
            </div>
            <div class="w-1/2">
              <div class="mb-5">
                <span class="mb-2 block text-sm text-cc-other-9">選擇數量</span>
                <div class="flex items-center">
                  <h6 class="flex-1 font-bold">票數</h6>
                  <span class="mr-2 whitespace-nowrap text-sm text-cc-other-9">
                    {{ currency(price, 'NT$ ') }}/{{ `每${unit}` }}
                  </span>
                  <div class="inline-flex items-center">
                    <button type="button" :disabled="qty <= 1" @click="decrement">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-8 w-8 text-cc-primary"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      readonly="readonly"
                      class="w-11 border-none bg-transparent text-center text-lg outline-none"
                      v-model="qty"
                    />
                    <button type="button" @click="increment">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-8 w-8 text-cc-primary"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div class="mt-5">
                <div class="flex items-center">
                  <span class="flex-1 whitespace-nowrap text-sm text-cc-other-9"> 總金額 </span>
                  <h5 class="font-bold">{{ getTotal }}</h5>
                </div>
              </div>
              <div class="mt-4 text-right">
                <Button :is-loading="adding" @click="addCart">加入購物車</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

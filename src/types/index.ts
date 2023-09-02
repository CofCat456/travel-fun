// WARN: 把產品照片都補上

// 產品
export interface Product {
  id: string
  title: string
  city: string
  address: string
  category: string
  unit: string
  evaluate: number
  evaluateNum: number
  price: number
  origin_price: number
  date: number
  coordinates: Coordinates
  description?: string
  is_enabled: boolean
  imageUrl: string
  imagesUrl?: string[]
  features?: string
  content?: string
  plans?: Plan[]
}

// 座標
export interface Coordinates {
  lat: number
  lng: number
}

// 購物車
export interface Cart {
  product_id: string
  qty: number
  coupon_code?: string
  id?: string
  total?: number
  final_total?: number
  product?: Product
  buy_date: number
}

// 訂單
export interface User {
  name: string
  email: string
  tel: string
  address: string
}

export interface Order {
  create_at?: number
  id?: string
  is_paid?: boolean
  message: string
  num?: number
  products?: Record<string, {
    buy_date: number
    final_total: number
    id: string
    product: Product
    product_id: string
    qty: number
    total: number
  }>
  total?: number
  user: User
}

// 優惠卷
export interface Coupon {
  code: string
  due_date: number
  id: string
  is_enabled: number
  num: number
  percent: number
  title: string
}

// 新聞
export interface New {
  title: string
  description: string
  image: string
}

export interface City {
  name: string
  enName: string
  image: string
}

export interface Plan {
  title: string
  content: string
  origin_price: number
  price: number
}

export enum Sort {
  Popular = 'popular',
  UserRating = 'userRating',
  PriceLowToHigh = 'priceLowToHigh',
  NewArrivals = 'newArrivals',
}

export * from './naive.ts';

import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { Product } from '@/types';
import { Toast } from '@/utils/global';

interface Data {
  data: Product
}

const { VITE_URL, VITE_PATH } = import.meta.env;

const request = axios.create({
  baseURL: VITE_URL,
  timeout: 5000,
});

export function successMsg(title: string, text?: string) {
  return Toast.fire({
    icon: 'success',
    title,
    text,
  });
}

export function errorMsg(title: string, text?: string) {
  return Toast.fire({
    icon: 'error',
    title,
    text,
  });
}

request.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (res: AxiosResponse) => {
    switch (res.status) {
      default:
        if (res?.data?.message)
          successMsg(res?.data?.message, '');

        return Promise.resolve(res);
    }
  },
  (error) => {
    switch (error.response?.status) {
      default:
        if (error?.response?.data?.message)
          errorMsg(error?.response?.data?.message, '');

        return Promise.reject(error);
    }
  },
);

const api = {
  user: {
    signin: 'admin/signin',
    logout: 'logout',
    checkSigin: 'api/user/check',
    product: `api/${VITE_PATH}/product`,
    cart: `api/${VITE_PATH}/cart`,
    coupon: `api/${VITE_PATH}/coupon`,
    order: `api/${VITE_PATH}/order`,
    pay: `api/${VITE_PATH}/pay`,
  },
  admin: {
    product: `api/${VITE_PATH}/admin/product`,
    upload: `api/${VITE_PATH}/admin/upload`,
    order: `api/${VITE_PATH}/admin/order`,
    coupon: `api/${VITE_PATH}/admin/coupon`,
  },
};

// API USER
const apiUserSignin = (data: any) => request.post(api.user.signin, data);
const apiUserLogout = () => request.post(api.user.logout);
const apiUserCheckSignin = () => request.post(api.user.checkSigin);
const apiUserGetAllProducts = () => request.get(`${api.user.product}s/all`);
function apiUserGetProducts(category: string = '') {
  if (category)
    return request.get(`${api.user.product}s?category=${category}`);

  return request.get(`${api.user.product}s`);
}
const apiUSerGetProduct = (id: string) => request.get(`${api.user.product}/${id}`);
const apiUserGetCarts = () => request.get(api.user.cart);
const apiUserPostCart = (data: any) => request.post(api.user.cart, data);
const apiUserDelCart = (id: string) => request.delete(`${api.user.cart}/${id}`);
const apiUserDelCarts = () => request.delete(`${api.user.cart}/s`);
const apiUserPostCoupon = (data: any) => request.post(api.user.coupon, data);
const apiUserGetOrder = (id: string) => request.get(`${api.user.order}/${id}`);
const apiUserPostOrder = (data: any) => request.post(api.user.order, data);
const apiUserPostPay = (id: string) => request.post(`${api.user.pay}/${id}`);

// API Admin
const apiAdminGetProducts = (page: number) => request.get(`${api.admin.product}s?page=${page}`);
const apiAdminGetAllProducts = () => request.get(`${api.admin.product}s/all`);
const apiAdminPostProduct = (data: Data) => request.post(api.admin.product, data);
const apiAdminPutProduct = (id: string, data: Data) => request.put(`${api.admin.product}/${id}`, data);
const apiAdminDelProduct = (id: string) => request.delete(`${api.admin.product}/${id}`);
function apiAdminUploadImage(formData: FormData) {
  return request.post(api.admin.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
const apiAdminGetOrders = () => request.get(`${api.admin.order}s`);
const apiAdminPutOrder = (id: string, data: any) => request.put(`${api.admin.order}/${id}`, data);
const apiAdminDelOrder = (id: string) => request.delete(`${api.admin.order}/${id}`);
const apiAdminDelOrders = () => request.delete(`${api.admin.order}s/all`);
const apiAdminGetCoupons = () => request.get(`${api.admin.coupon}s`);
const apiAdminPostCoupon = (data: any) => request.post(`${api.admin.coupon}`, data);
const apiAdminPutCoupon = (id: string, data: any) => request.put(`${api.admin.coupon}/${id}`, data);
const apiAdminDelCoupon = (id: string) => request.delete(`${api.admin.coupon}/${id}`);

export {
  api,
  apiAdminGetAllProducts,
  apiAdminGetProducts,
  apiAdminPostProduct,
  apiAdminPutProduct,
  apiAdminDelProduct,
  apiAdminUploadImage,
  apiAdminGetOrders,
  apiAdminPutOrder,
  apiAdminDelOrder,
  apiAdminDelOrders,
  apiAdminGetCoupons,
  apiAdminPostCoupon,
  apiAdminPutCoupon,
  apiAdminDelCoupon,
  apiUserSignin,
  apiUserLogout,
  apiUserCheckSignin,
  apiUserGetAllProducts,
  apiUserGetCarts,
  apiUSerGetProduct,
  apiUserGetProducts,
  apiUserPostCart,
  apiUserDelCart,
  apiUserDelCarts,
  apiUserPostCoupon,
  apiUserGetOrder,
  apiUserPostOrder,
  apiUserPostPay,
};

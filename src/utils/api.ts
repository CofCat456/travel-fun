import type { AxiosResponse } from 'axios';
import axios from 'axios';
import Swal from 'sweetalert2';
import type { Product } from '@/types';

interface Data {
  data: Product
}

const { VITE_URL, VITE_PATH } = import.meta.env;

const request = axios.create({
  baseURL: VITE_URL,
  timeout: 5000,
});

export function successMsg(title: string, text: string) {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    icon: 'success',
    title,
    text,
  });
}

export function errorMsg(title: string, text: string) {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
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
  },
  admin: {
    product: `api/${VITE_PATH}/admin/product`,
    upload: `api/${VITE_PATH}/admin/upload`,
    order: `api/${VITE_PATH}/admin/order`,
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
const apiUserDeleteCart = (id: string) => request.delete(`${api.user.cart}/${id}`);
const apiUserDeleteCarts = () => request.delete(`${api.user.cart}/s`);
const apiUserPostCoupon = (data: any) => request.post(api.user.coupon, data);
const apiUserPostOrder = (data: any) => request.post(api.user.order, data);

// API Admin
const apiAdminGetProducts = (page: number) => request.get(`${api.admin.product}s?page=${page}`);
const apiAdminGetAllProducts = () => request.get(`${api.admin.product}s/all`);
const apiAdminPostProduct = (data: Data) => request.post(api.admin.product, data);
const apiAdminPutProduct = (id: string, data: Data) => request.put(`${api.admin.product}/${id}`, data);
const apiAdminDeleteProduct = (id: string) => request.delete(`${api.admin.product}/${id}`);
function apiAdminUploadImage(formData: FormData) {
  return request.post(api.admin.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
const apiAdminGetOrders = () => request.get(`${api.admin.order}s`);
const apiAdminPutOrder = (id: string, data: any) => request.put(`${api.admin.order}/${id}`, data);
const apiAdminDeleteOrder = (id: string) => request.delete(`${api.admin.order}/${id}`);
const apiAdminDeleteAllOrders = () => request.delete(`${api.admin.order}/all`);

export {
  api,
  apiAdminGetAllProducts,
  apiAdminGetProducts,
  apiAdminPostProduct,
  apiAdminPutProduct,
  apiAdminDeleteProduct,
  apiAdminUploadImage,
  apiAdminGetOrders,
  apiAdminPutOrder,
  apiAdminDeleteOrder,
  apiAdminDeleteAllOrders,
  apiUserSignin,
  apiUserLogout,
  apiUserCheckSignin,
  apiUserGetAllProducts,
  apiUserGetCarts,
  apiUSerGetProduct,
  apiUserGetProducts,
  apiUserPostCart,
  apiUserDeleteCart,
  apiUserDeleteCarts,
  apiUserPostCoupon,
  apiUserPostOrder,
};

import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

const request = axios.create({
  baseURL: VITE_URL,
  timeout: 5000
});

export const successMsg = (title, text) =>
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    icon: 'success',
    title,
    text
  });

export const errorMsg = (title, text) =>
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    icon: 'error',
    title,
    text
  });

request.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    // FIX: 解決第一次登入時會跳出的問題
    // console.log('api config', config);
    // console.log(
    //   'token',
    //   document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    switch (res.status) {
      default:
        if (res?.data?.message) {
          successMsg(res?.data?.message);
        }
        return Promise.resolve(res);
    }
  },
  (error) => {
    switch (error.response.status) {
      default:
        if (error?.response?.data?.message) {
          errorMsg(error?.response?.data?.message);
        }
        return Promise.reject(error);
    }
  }
);

const api = {
  user: {
    signin: 'admin/signin',
    logout: 'logout',
    checkSigin: 'api/user/check',
    product: `api/${VITE_PATH}/product`,
    cart: `api/${VITE_PATH}/cart`
  },
  admin: {
    product: `api/${VITE_PATH}/admin/product`,
    upload: `api/${VITE_PATH}/admin/upload`
  }
};

// API USER
const apiUserSignin = (data) => request.post(api.user.signin, data);
const apiUserLogout = () => request.post(api.user.logout);
const apiUserCheckSignin = () => request.post(api.user.checkSigin);
const apiUserGetAllProducts = () => request.get(`${api.user.product}s/all`);
const apiUserGetProducts = (category = '') => {
  if (category) {
    return request.get(`${api.user.product}s?category=${category}`);
  }
  return request.get(`${api.user.product}s`);
};
const apiUSerGetProduct = (id) => request.get(`${api.user.product}/${id}`);
const apiUserGetCarts = () => request.get(api.user.cart);
const apiUserPostCart = (data) => request.post(api.user.cart, data);

// API Admin
const apiAdminGetProducts = (page) => request.get(`${api.admin.product}s?page=${page}`);
const apiAdminGetAllProducts = () => request.get(`${api.admin.product}s/all`);
const apiAdminPostProducts = (data) => request.post(api.admin.product, data);
const apiAdminPutProducts = (id, data) => request.put(`${api.admin.product}/${id}`, data);
const apiAdminDeleteProducts = (id) => request.delete(`${api.admin.product}/${id}`);
const apiAdminUploadImage = (formData) =>
  request.post(api.admin.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export {
  api,
  apiAdminDeleteProducts,
  apiAdminGetAllProducts,
  apiAdminGetProducts,
  apiAdminPostProducts,
  apiAdminPutProducts,
  apiAdminUploadImage,
  apiUserCheckSignin,
  apiUserGetAllProducts,
  apiUserGetCarts,
  apiUSerGetProduct,
  apiUserGetProducts,
  apiUserLogout,
  apiUserPostCart,
  apiUserSignin
};

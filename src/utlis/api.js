import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

const request = axios.create({
  baseURL: VITE_URL
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
    // console.log(config);
    // console.log(document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1'));
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
    signin: '/admin/signin',
    logout: '/logout',
    checkSigin: '/api/user/check'
  },
  admin: {
    product: `api/${VITE_PATH}/admin/product`
  }
};

export const apiUserSignin = (data) => request.post(api.user.signin, data);
export const apiUserLogout = () => request.post(api.user.logout);
export const apiUserCheckSignin = () => request.post(api.user.checkSigin);

export const apiAdminGetProducts = (page) => request.get(`${api.admin.product}s?page=${page}`);
export const apiAdminPostProducts = (data) => request.post(api.admin.product, data);
export const apiAdminPutProducts = (id, data) => request.put(`${api.admin.product}/${id}`, data);
export const apiAdminDeleteProducts = (id) => request.delete(`${api.admin.product}/${id}`);

export default {};

import axios from 'axios';
import Swal from 'sweetalert2';

import { token } from './global';

const { VITE_URL } = import.meta.env;

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
    if (token) {
      config.headers.Authorization = token;
    }
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
        errorMsg(error?.response?.data?.message);
        return Promise.reject(error);
    }
  }
);

const api = {
  user: {
    sigin: '/admin/signin',
    checkSigin: '/api/user/check'
  }
};

export const apiUserSignin = (data) => request.post(api.user.sigin, data);
export const apiUserCheckSignin = () => request.post(api.user.checkSigin);

export default {};

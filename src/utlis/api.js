import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

const userRequest = axios.create({
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

userRequest.interceptors.response.use(
  (res) => {
    switch (res.status) {
      default:
        successMsg(res?.data?.message);
        return Promise.resolve(res);
    }
  },
  (error) => {
    switch (error.response.status) {
      default:
        errorMsg(error?.response);
        return Promise.reject(error);
    }
  }
);

const api = {
  user: {
    login: '/admin/signin'
  }
};

export const apiUserSignin = (data) => userRequest.post(api.user.login, data);

export default {};

import Swal from 'sweetalert2';
import type { Sort } from '@/types';

interface RouterOption {
  query?: { sort: Sort }
  params: {
    category: string
    cityName?: string
    countryName?: string
  }
}

// 換算金錢
export function currency(val: number, symbol: string = 'NT$ '): string {
  if (!val)
    return '0';
  const arr = val.toString().split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return symbol + arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
}

// 轉換日期 (ISO 8601 to 年/月/日)
export function formatDate2YMD(dateTimeString: number): string {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 將月份和日期補零成兩位數
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');

  // 將年、月、日組合成「年/月/日」的格式
  const formattedDate = `${year}/${formattedMonth}/${formattedDay}`;

  return formattedDate;
}

// 轉換日期 unix timestamp
export function formatUnix2YMD(unix: number): string {
  const date = new Date(unix * 1000);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}

// 生成 routerOption
export function createRouterOption(name: string, category: string, sort: Sort, isCity = true) {
  const routerOption: RouterOption = {
    params: { category },
  };

  if (isCity && name)
    routerOption.params.cityName = name;
  else
    routerOption.params.countryName = name;

  routerOption.query = { sort };

  return routerOption;
}

// JS 錨點
export function scrollTo(id: string) {
  const element = document.getElementById(id);

  if (element) {
    const elementHeight = element.offsetHeight;
    const windowHeight = window.innerHeight;

    // 計算捲動位置，使元素中間位於視窗中央
    const top = element.offsetTop - (windowHeight - elementHeight) / 2;

    window.scroll({ behavior: 'smooth', top });
  }
}

// 轉換照片格式
export function imageTransformHandler(file: any) {
  if (!file)
    return null;

  const formData = new FormData();
  formData.append('file-to-upload', file);
  return formData;
}

// 轉換 Map
export function mapToArray(map: any) {
  return Array.from(map, ([key, value]) => ({ label: value, value: key }));
}

export function checkToken() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );

  return token === '';
}

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

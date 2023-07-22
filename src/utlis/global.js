// 換算金錢
const currency = (val, symbol = '') => {
  if (!val) return 0;
  const arr = val.toString().split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return symbol + arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
};

// 轉換日期 (ISO 8601 to 年/月/日)
const formatDate2YMD = (dateTimeString) => {
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
};

// 生成 routerOption
const createRouterOption = (cityName, category, sort = '') => {
  const routerOption = {
    params: { cityName, category }
  };

  if (sort) {
    routerOption.query = { sort };
  }

  return routerOption;
};

// JS 錨點
const scrollTo = (id) => {
  const element = document.getElementById(id);
  const top = element.offsetTop;
  window.scroll({ top, behavior: 'smooth' });
};

// 轉換照片格式
const imageTransformHandler = (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file-to-upload', file);
  return formData;
};

// 轉換 Map
const mapToArray = (map) => {
  return Array.from(map, ([key, value]) => ({ label: value, value: key }));
};

export {
  createRouterOption,
  currency,
  formatDate2YMD,
  imageTransformHandler,
  mapToArray,
  scrollTo
};

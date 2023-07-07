// 換算金錢
export const currency = (val, symbol = '') => {
  if (!val) return 0;
  const arr = val.toString().split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return symbol + arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
};

// 生成 routerOption
export const createRouterOption = (cityName, category, sort = '') => {
  const routerOption = {
    params: { cityName, category }
  };

  if (sort) {
    routerOption.query = { sort };
  }

  return routerOption;
};

// JS 錨點
export const scrollTo = (id) => {
  const element = document.getElementById(id);
  const top = element.offsetTop;
  window.scroll({ top, behavior: 'smooth' });
};

export default {};

// 換算金錢
export const currency = (val, symbol = '') => {
  if (!val) return 0;
  const arr = val.toString().split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return symbol + arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
};

export default {};

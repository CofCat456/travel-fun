// 換算金錢
export const currency = (val, symbol = '') => {
  if (!val) return 0;
  const arr = val.toString().split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return symbol + arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
};

// 取出特定數量產品 or 指定程式
export const filterProduct = (array = [], city = '', category = '', num = 10) => {
  let newArray = [...array];
  if (array.length === 0) return newArray;
  if (city) newArray = array.filter((item) => item.city === city);
  if (category) newArray = newArray.filter((item) => item.category === category);

  return num === 0 ? newArray : newArray.slice(0, num);
};

export default {};

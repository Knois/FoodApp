/*                         Возвращает сумму калорий из массива объектов*/
export const getSumCaloriesFromArray = (arr) => {
  let sum = 0;
  arr.forEach((el) => {
    sum = sum + +el.calories;
  });
  return sum;
};

/*                         Возвращает строку, где первый символ заглавный, остальные маленькие*/
export const stringToNormalCase = (str) => {
  if (str == "") {
    return "Без названия";
  }
  let lowerCaseString = str.slice(0).toLowerCase();
  return lowerCaseString[0].toUpperCase() + lowerCaseString.slice(1);
};

export const getRecommendedCaloriesPerDay = () => {};

export const getBodyMassIndex = () => {};

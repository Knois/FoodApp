import { birthdayToAge } from "./DateMethods";

//Возвращает сумму калорий/БЖУ из массива элементов приема пищи
export const getSumCaloriesFromArray = (arr) => {
  let sum = 0;
  arr.forEach((el) => {
    sum = sum + +el.calories;
  });
  sum.toFixed(2);
  return Math.ceil(sum * 100) / 100;
};
export const getSumProteinsFromArray = (arr) => {
  let sum = 0;
  arr.forEach((el) => {
    sum = sum + +el.proteins;
  });
  sum.toFixed(2);
  return Math.ceil(sum * 100) / 100;
};
export const getSumFatsFromArray = (arr) => {
  let sum = 0;
  arr.forEach((el) => {
    sum = sum + +el.fats;
  });
  sum.toFixed(2);
  return Math.ceil(sum * 100) / 100;
};
export const getSumCarbohydratesFromArray = (arr) => {
  let sum = 0;
  arr.forEach((el) => {
    sum = sum + +el.carbohydrates;
  });

  return Math.ceil(sum * 100) / 100;
};
//Возвращает сумму калорий/БЖУ за день из массива приемов пищи
export const countDailyCalories = (arr) => {
  let sum = 0;
  for (let el of arr) {
    sum = sum + getSumCaloriesFromArray(el.mealElements);
  }
  return Math.floor(sum * 100) / 100;
};
export const countDailyProteins = (arr) => {
  let sum = 0;
  for (let el of arr) {
    sum = sum + getSumProteinsFromArray(el.mealElements);
  }
  return Math.floor(sum * 100) / 100;
};
export const countDailyFats = (arr) => {
  let sum = 0;
  for (let el of arr) {
    sum = sum + getSumFatsFromArray(el.mealElements);
  }
  return Math.floor(sum * 100) / 100;
};
export const countDailyCarbohydrates = (arr) => {
  let sum = 0;
  for (let el of arr) {
    sum = sum + getSumCarbohydratesFromArray(el.mealElements);
  }

  return Math.floor(sum * 100) / 100;
};

//Возвращает строку, где первый символ заглавный, остальные маленькие
export const stringToNormalCase = (str) => {
  if (str == "") {
    return "Без названия";
  }
  let lowerCaseString = str.slice(0).toLowerCase();
  return lowerCaseString[0].toUpperCase() + lowerCaseString.slice(1);
};

export const getRecommendedCaloriesPerDay = (
  gender,
  weight,
  height,
  birthday,
  physicalActivityLevel
) => {
  if (gender && weight && height && birthday && physicalActivityLevel) {
    let result = 10 * weight + 6.25 * height - 5 * birthdayToAge(birthday);
    gender == "MALE"
      ? (result = (result + 5) * physicalActivityLevel)
      : (result = (result - 161) * physicalActivityLevel);
    return Math.round(result);
  } else {
    return 0;
  }
};

export const getBodyMassIndex = (weight, height) => {
  if (weight && height) {
    let result = weight / ((height / 100) * (height / 100));
    if (result < 16.5) {
      return "Крайний недостаток веса (" + result.toFixed(2) + ")";
    }
    if (result >= 16.5 && result < 18.5) {
      return "Недостаток в весе (" + result.toFixed(2) + ")";
    }
    if (result >= 18.5 && result < 25) {
      return "Нормальный вес (" + result.toFixed(2) + ")";
    }
    if (result >= 25 && result < 30.1) {
      return "Избыточная масса (" + result.toFixed(2) + ")";
    }
    if (result >= 30.1 && result < 35) {
      return "Ожирение (" + result.toFixed(2) + ")";
    }
    if (result >= 35 && result < 40) {
      return "Тяжелое ожирение (" + result.toFixed(2) + ")";
    }
    if (result >= 40) {
      return "Крайне тяжелое ожирение (" + result.toFixed(2) + ")";
    }
  } else {
    return 0;
  }
};

export const countCalories = (proteins, fats, carbohydrates) => {
  let result = 0;
  if (proteins) {
    result = result + proteins * 4;
  }
  if (fats) {
    result = result + fats * 9;
  }
  if (carbohydrates) {
    result = result + carbohydrates * 4;
  }
  return result;
};

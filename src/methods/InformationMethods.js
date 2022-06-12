import { birthdayToAge } from "./DateMethods";

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

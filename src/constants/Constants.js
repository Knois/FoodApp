//Цвета для стилей
export const MAIN = "#645fb1";
export const SECONDARY = "#d8d6ed";
export const GREY = "#9599a4";
export const LIGHT = "#f0edf9";

export const measurementTypes = [
  "GRAM",
  "KILOGRAM",
  "LITER",
  "MILLILITER",
  "PACK",
  "PIECE",
  "PACK",
  "SOUP_SPOON",
  "TEA_SPOON",
  "UNIT",
  "CUP",
];

export const mealTypes = [
  "BREAKFAST",
  "LUNCH",
  "DINNER",
  "SUPPER",
  "LATE_SUPPER",
];

export const genderArray = ["MALE", "FEMALE"];

export const physicalActivityLevelArray = [
  { param: 1.2, name: "Сидячий образ жизни" },
  { param: 1.375, name: "Тренировки 1-3 раза в неделю" },
  { param: 1.55, name: "Тренировки 3-5 раз в неделю" },
  { param: 1.725, name: "Ежедневные тренировки" },
  { param: 1.9, name: "Тренировки 2 раза в день" },
];

export const targetWeightTypeArray = [
  { param: "GAIN", name: "Набрать вес" },
  { param: "LOSE", name: "Сбросить вес" },
  { param: "SAVE", name: "Сохранить вес" },
];

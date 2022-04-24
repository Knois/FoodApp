export const getSumCaloriesFromArray = (arr) => {
  let sum = 0;
  arr.forEach((el) => {
    sum = sum + +el.calories;
  });
  return sum;
};

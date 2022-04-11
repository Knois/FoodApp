import moment from "moment";

export const currentDate = () => {
  let date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss+03:00");
  return date;
};

export const toNormalDate = (smth) => {
  let date = moment(smth).format("YYYY-MM-DDTHH:mm:ss+03:00");
  return date;
};

export const dateFormatted = (smth) => {
  let date = moment(smth ? smth : new Date(), "YYYY/MM/DD").format(
    "YYYY-MM-DD"
  );
  return date;
};

export const timeNow = () => {
  let time = moment(new Date()).format("HH:mm:ss+03:00");
  return time;
};

export const getSumCaloriesFromArray = (arr) => {
  let sum = 0;
  arr.forEach((el) => {
    sum = sum + el.calories;
  });
  return sum;
};

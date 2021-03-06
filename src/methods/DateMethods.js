import moment from "moment";
import "moment/locale/ru"; // Локализация
moment.locale("ru");
moment.updateLocale("ru", {
  weekdays: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
});

export const toNormalDate = (smth) => {
  let date = moment(smth ? smth : new Date()).format("YYYY-MM-DD HH:mm:ss");
  return date;
};

export const dateFormatted = (smth) => {
  let date = moment(smth ? smth : new Date(), "YYYY/MM/DD").format(
    "YYYY-MM-DD"
  );
  return date;
};

export const dateToNormalDate = (smth) => {
  let date = moment(smth, "YYYY-MM-DD").locale("ru").format("DD MMMM YYYY");
  return date;
};

export const dateToWeekDay = (smth) => {
  let date = moment(smth, "YYYY-MM-DD").locale("ru").format("dddd");
  return date;
};

export const timeNow = (smth) => {
  let time = moment(smth ? smth : new Date()).format("HH:mm");
  return time;
};

export const birthdayToAge = (smth) => {
  let age = moment(new Date()).diff(smth, "years");
  return age;
};

export const today = () => {
  let date = moment(new Date()).format("YYYY-MM-DD");
  return date;
};

export const dateToNotNormalDate = (smth) => {
  let date = moment(smth ? smth : new Date(), "DD MMMM YYYY").format(
    "YYYY-MM-DD"
  );
  return date;
};

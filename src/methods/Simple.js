import moment from "moment";

export const currentDate = () => {
  let date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss+03:00");
  return date;
};

export const dateFormatted = (smth) => {
  let date = moment(smth ? smth : new Date(), "YYYY/MM/DD").format(
    "YYYY-MM-DD"
  );
  return date;
};

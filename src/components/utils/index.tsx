import moment from "moment";
export const isEmpty = (value : string) => {
  if (value === undefined || value === null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "string") return value.trim().length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

export const isValidEmail = (email: string) => {
  if (email) {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  } else {
    return true;
  }
};

export const formatedDate = (date: Date) => {
  const myMoment = moment(date);
  const modifiedMoment = myMoment.add(1, "day");
  const formattedMoment = modifiedMoment.format("YYYY-MM-DDTHH:mm:ss");
  console.log(formattedMoment); //
  return formattedMoment
}

export const localStorageUserInfo = () => {
  const user_id = window.localStorage.getItem("user_id") || "";
  const user_name = window.localStorage.getItem("user_name") || "";
  const user_email = window.localStorage.getItem("user_email") || "";
  const token = window.localStorage.getItem("token") || "";
  const localUserInfo = {
    user_id: user_id,
    user_name: user_name,
    user_email: user_email,
    token: token,
  };
  return localUserInfo;
};


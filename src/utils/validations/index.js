import Messages from "../../utils/language/en/en.json";

const { requiredField, incorrectPassword, incorrectEmail, incorrectPhoneNo, incorrectName } = Messages.validationError;

export const validateEmail = (email) => {
  if (!email)
    return requiredField;
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    return incorrectEmail;

  return undefined;
}

export const validatePassword = (password) => {
  if (!password)
    return requiredField;
  if (password.length < 6 || password.length > 50)
    return incorrectPassword;

  return undefined;
}

export const validatePhoneNo = (phone) => {
  if (!phone) {
    return requiredField;
  }
  if(phone.length!==10)
  return incorrectPhoneNo;
  return undefined;
}

export const validateUserName = (name) => {
  if (!name) {
    return requiredField;
  }
  if (name.length < 6 || name.length > 30) {
    return incorrectName;
  }
  return undefined;
}
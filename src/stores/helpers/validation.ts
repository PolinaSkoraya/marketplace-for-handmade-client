import * as Yup from "yup";

export const validateLength = (value) => {
  return !value || value.length < 6
    ? "must be longer than 5 characters"
    : undefined;
};

export const validateNumber = (value) => {
  return !value || !Number.isInteger(parseInt(value, 10))
    ? "only number"
    : undefined;
};

export const validateEmail = (value) => {
  return !value || !value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
  ? "invalid email"
  : undefined
};


export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

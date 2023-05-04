import * as Yup from "yup";

export interface IUpdatePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export const updatePasswordInitialValues = (): IUpdatePassword => {
  return {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
};

export const updatePasswordValidations = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  newPassword: Yup.string()
    .min(8, "Password must have 8 characters")
    .required("New password is required!")
    .test("isValidPass", "Must have UpperCase Letter", (value, context) => {
      const hasUpperCase = /[A-Z]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 1;
      const conditions = [hasUpperCase];
      conditions.forEach((condition) => (condition ? validConditions++ : null));
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    })
    .test("isValidPass", "Must have LowerCase Letter", (value, context) => {
      const hasLowerCase = /[a-z]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 1;
      const conditions = [hasLowerCase];
      conditions.forEach((condition) => (condition ? validConditions++ : null));
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    })
    .test("isValidPass", "Must have Numbers", (value, context) => {
      const hasNumber = /[0-9]/.test(value);

      let validConditions = 0;
      const numberOfMustBeValidConditions = 1;
      const conditions = [hasNumber];
      conditions.forEach((condition) => (condition ? validConditions++ : null));
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    })
    .test("isValidPass", "Must have Symbol", (value, context) => {
      const hasSymbole = /[!@#%&]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 1;
      const conditions = [hasSymbole];
      conditions.forEach((condition) => (condition ? validConditions++ : null));
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords does not match")
    .min(8, "Password must have 8 characters!")
    .required("Confirm password is required!"),
});

export const showPasswordState = () => {
  return { password: false, newPassword: false, confirmPassword: false };
};

export const InputConstants = [
  {
    label: "Password",
    id: "password",
  },
  {
    label: "New password",
    id: "newPassword",
  },
  {
    label: "Confirm password",
    id: "confirmPassword",
  },
];

import * as Yup from "yup";

export const loginValidations = Yup.object().shape({
  email: Yup.string().email().required("E-mail is required!"),
  password: Yup.string().required("Password is required!"),
});

export interface ILogin {
  email: string;
  password: string;
}

export const LoginInitialValues = (): ILogin => {
  return {
    email: "admin@site.com",
    password: "pass2word",
  };
};

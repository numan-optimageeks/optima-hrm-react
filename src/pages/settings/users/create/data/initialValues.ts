import * as Yup from "yup";

export interface CreateUser {
  email: string;
  full_name: string;
  password?: string;
  role?: string;
}

export const validations = Yup.object().shape({
  email: Yup.string().required("E-mail is required!"),
  full_name: Yup.string().required("Name is required!"),
  password: Yup.string().required("Password is required!"),
});

export const editValidations = Yup.object().shape({
  email: Yup.string().required("E-mail is required!"),
  full_name: Yup.string().required("Name is required!"),
});

export const initialValues = (): CreateUser => {
  return {
    email: "",
    full_name: "",
    password: "",
    role: "",
  };
};

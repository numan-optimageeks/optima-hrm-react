import * as Yup from "yup";
import { format } from "date-fns";

export interface CreateApplicant {
  address?: string;
  age?: string;
  city?: string;
  cnic?: string;
  education?: string;
  email?: string;
  fullName?: string;
  gender?: string;
  phoneNumber?: string;
  state?: string;
}

export const validations = Yup.object().shape({
  education: Yup.string().required("Education is required!"),
  email: Yup.string().required("E-mail is required!"),
  fullName: Yup.string()
    .min(3, "Must have 3 charecter!")
    ?.required("Name is required!"),
  gender: Yup.string().required("Gender is required!"),
});

export const initialValues = (): CreateApplicant => {
  return {
    address: "",
    age: "",
    city: "Ahmadpur Sial",
    cnic: "",
    education: "",
    email: "",
    fullName: "",
    gender: "",
    phoneNumber: "+92",
    state: "Punjab",
  };
};

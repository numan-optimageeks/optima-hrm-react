import * as Yup from "yup";
import { format } from "date-fns";

export interface CreateApplicant {
  address?: string;
  age: number | undefined;
  city: string;
  cnic: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  state: string;
  linkedinHandle?: string;
  education: string;
  graduationYear: string;
  university: string;
}

export const validations = Yup.object().shape({
  education: Yup.string().required("Education is required!"),
  email: Yup.string().required("E-mail is required!"),
  fullName: Yup.string()
    .min(3, "Must have 3 charecter!")
    .required("Name is required!"),
  gender: Yup.string().required("Gender is required!"),
  cnic: Yup.string().required("CNIC is required!"),
  age: Yup.number()
    .required("Age is required!")
    .test("testAge", "Age limit is 120", (value: number) => {
      if (value && value < 120) {
        return true;
      }
      return false;
    }),
  graduationYear: Yup.string().required("Graduation Year is required!"),
  city: Yup.string().required("City is required!"),
  state: Yup.string().required("State is required!"),
  phoneNumber: Yup.string().required("Phone Number is required!"),
  linkedinHandle: Yup.string().required("Linkedin Handle is required!"),
  university: Yup.string().required("University is required!"),
  address: Yup.string(),
});

export const initialValues = (): CreateApplicant => {
  return {
    address: "",
    age: undefined,
    city: "Lahore",
    cnic: "",
    email: "",
    fullName: "",
    gender: "",
    phoneNumber: "+92",
    linkedinHandle: "",
    state: "Punjab",
    education: "",
    graduationYear: "",
    university: "",
  };
};

import * as Yup from "yup";
import { format } from "date-fns";

export interface CreateEmployee {
  id?: number;
  fullName?: string;
  cnic?: string;
  email?: string;
  contactDetail?: string;
  companyEmail?: string;
  workType?: string;
  dateOfBirth?: string;
  joiningDate?: string;
  gender?: string;
  managerId?: string;
  departmentId?: string;
  designationId?: string;
  state?: string;
  city?: string;
  address?: string;
  employeeDepartment?: string;
  employeeDesignation?: string;
  employeeId?: string;
}

export const validations = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Must have 3 charecter!")
    ?.required("Name is required!"),
  cnic: Yup.string().min(13, "CNIC is invalid!").required("CNIC is required!"),
  workType: Yup.string().required("Work type is required!"),
  email: Yup.string().required("E-mail is required!"),
  dateOfBirth: Yup.string().required("Date of birth is required!"),
  joiningDate: Yup.string().required("Date of joining is required!"),
  gender: Yup.string().required("Gender is required!"),
  address: Yup.string().required("Address is required!"),
});

export const initialValues = (): CreateEmployee => {
  return {
    address: "",
    city: "Ahmadpur Sial",
    cnic: "",
    companyEmail: "",
    contactDetail: "+92",
    dateOfBirth: format(new Date(), "yyyy-MM-dd"),
    departmentId: "",
    designationId: "",
    email: "",
    employeeId: "OG_01",
    fullName: "",
    gender: "",
    joiningDate: format(new Date(), "yyyy-MM-dd"),
    managerId: "",
    state: "Punjab",
    workType: "",
  };
};

import * as Yup from "yup";

export interface CreateDepartment {
  name: string;
  desc: string;
}

export const validations = Yup.object().shape({
  name: Yup.string().required("Department name is required!"),
});

export const initialValues = (): CreateDepartment => {
  return {
    name: "",
    desc: "",
  };
};

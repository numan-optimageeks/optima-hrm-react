import * as Yup from "yup";

export interface CreateDesignation {
  name: string;
  abbrevation: string;
  desc: string;
}

export const validations = Yup.object().shape({
  name: Yup.string().required("Department name is required!"),
  abbrevation: Yup.string().required("Abbrevation is required!"),
});

export const initialValues = (): CreateDesignation => {
  return {
    name: "",
    abbrevation: "",
    desc: "",
  };
};

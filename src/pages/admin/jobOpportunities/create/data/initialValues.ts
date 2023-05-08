import * as Yup from "yup";
import { format } from "date-fns";

export interface ICreateJob {
  id?: string;
  email?: string;
  openingDate?: string;
  position?: string;
  noOfHiring?: string;
  experiance?: string;
  designation?: string;
  budget?: string;
  employmentType?: string;
  location?: string;
  urgencyLevel?: string;
  technicalSpecification?: string;
  otherRequirements?: string;
  requestedBy?: string;
  status?: string;
  assignedPositions?: any;
}

export const validations = Yup.object().shape({
  email: Yup.string().email().required("E-mail is required!"),
  openingDate: Yup.string().required("Date is required!"),
  position: Yup.string().required("Position is required!"),
  noOfHiring: Yup.string().required("No of Hiring is required!"),
  experiance: Yup.string().required("Experiance is required!"),
  designation: Yup.string().required("Designation is required!"),
  budget: Yup.string().required("Budget is required!"),
  employmentType: Yup.string().required("Department name is required!"),
  location: Yup.string().required("Location is required!"),
  urgencyLevel: Yup.string().required("Urgency Level is required!"),
  technicalSpecification: Yup.string().required(
    "Technical Specification is required!"
  ),
  otherRequirements: Yup.string().required("Other Requirements is required!"),
  requestedBy: Yup.string().required("Requested By is required!"),
  status: Yup.string().required("Status is required!"),
});

export const initialValues = (): ICreateJob => {
  return {
    email: "",
    openingDate: format(new Date(), "yyyy-MM-dd"),
    position: "",
    noOfHiring: "",
    experiance: "",
    designation: "",
    budget: "",
    employmentType: "",
    location: "",
    urgencyLevel: "",
    technicalSpecification: "",
    otherRequirements: "",
    requestedBy: "",
    status: "open",
  };
};

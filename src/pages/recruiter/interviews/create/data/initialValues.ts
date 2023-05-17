import * as Yup from "yup";
import { format } from "date-fns";

export interface ICreateInterview {
  interviewerId?: number | undefined;
  interviewerName?: string;
  status?: string;
  interviewTimings?: string;
  appliedFor?: number | undefined;
  currentCompany?: string;
  currentCompanyExperience?: string;
  teamLeadExperience?: string;
  totalExperience?: string;
  applicantId?: string;
  companyContactPerson?: string;
  currentSalary?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  hrScore?: string;
  technicalScore?: string;
  hrRemarks?: string;
  interviewerRemarks?: string;
  recommendationStatus?: string;
  teamHeadCount: number;
  reasonOfLeaving?: string;
}

const numberDecimalRegex = /^[0-9\.]+$/;
const numberRegex = /^[0-9\.]+$/;
const numberErrorMessage = "Please enter a valid number";

export const validations = Yup.object().shape({
  interviewerId: Yup.number().required("Please select interviewer"),
  interviewerName: Yup.string(),
  status: Yup.string().required("Interview Status is required!"),
  interviewTimings: Yup.string().required("Interview Timings is required!"),
  appliedFor: Yup.number().required("Please select the position"),
  currentCompany: Yup.string().required("Please enter current company Name"),
  currentCompanyExperience: Yup.string().required(
    "Please enter the previous company experience"
  ),
  teamLeadExperience: Yup.string().required(
    "Please enter the team lead experience"
  ),
  applicantId: Yup.string().required(),
  companyContactPerson: Yup.string().required(
    "Please enter the company contact person"
  ),
  currentSalary: Yup.string()
    .required("Please enter the current salary")
    .matches(numberDecimalRegex, numberErrorMessage),
  expectedSalary: Yup.string()
    .required("Please enter the expected salary")
    .matches(numberDecimalRegex, numberErrorMessage),
  noticePeriod: Yup.string()
    .required("Please enter the notice period")
    .matches(numberRegex, numberErrorMessage),
  hrScore: Yup.string(),
  technicalScore: Yup.string(),
  hrRemarks: Yup.string(),
  interviewerRemarks: Yup.string(),
  recommendationStatus: Yup.string(),
  teamHeadCount: Yup.number().required("Please enter the team"),
  reasonOfLeaving: Yup.string().required("Please enter the reason of leaving"),
});

export const initialValues = (): ICreateInterview => {
  const getDate = () => {
    const date = new Date();
    return `${format(date, "yyyy-MM-dd")}T${format(date, "HH:mm")}`;
  };
  return {
    interviewerId: undefined,
    interviewerName: "",
    status: "",
    interviewTimings: getDate(),
    appliedFor: undefined,
    currentCompany: "",
    currentCompanyExperience: "",
    teamLeadExperience: "",
    totalExperience: "",
    applicantId: "",
    companyContactPerson: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    teamHeadCount: 0,
    hrScore: "",
    technicalScore: "",
    hrRemarks: "",
    interviewerRemarks: "",
    recommendationStatus: "",
    reasonOfLeaving: "",
  };
};

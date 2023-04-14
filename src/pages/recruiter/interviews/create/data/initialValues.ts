import * as Yup from "yup";
import { format } from "date-fns";

export interface ICreateInterview {
  interviewerId?: number;
  interviewerName?: string;
  status?: string;
  interviewTimings?: string;
  appliedFor?: string;
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
}

export const validations = Yup.object().shape({});

export const initialValues = (): ICreateInterview => {
  const getDate = () => {
    const date = new Date();
    return `${format(date, "yyyy-MM-dd")}T${format(date, "HH:mm")}`;
  };
  return {
    interviewerId: null,
    interviewerName: "",
    status: "",
    interviewTimings: getDate(),
    appliedFor: "",
    currentCompany: "",
    currentCompanyExperience: "",
    teamLeadExperience: "",
    totalExperience: "",
    applicantId: "",
    companyContactPerson: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",

    hrScore: "",
    technicalScore: "",
    hrRemarks: "",
    interviewerRemarks: "",
    recommendationStatus: "",
  };
};

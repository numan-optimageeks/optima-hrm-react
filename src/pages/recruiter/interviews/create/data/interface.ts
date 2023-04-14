import { IApplicant } from "src/pages/recruiter/applicants/create/data/interface";

interface IInterviewDetail {
  applicantId?: number;
  appliedFor?: string;
  companyContactPerson?: string;
  createdAt?: string;
  createdBy?: string;
  currentCompany?: string;
  currentCompanyExperience?: string;
  currentSalary?: string;
  expectedSalary?: string;
  hrRemarks?: string;
  hrScore?: string;
  id?: number;
  interviewTimings?: string;
  interviewerId?: number;
  interviewerRemarks?: string;
  isDeleted?: boolean;
  noticePeriod?: string;
  recommendationStatus?: string;
  startingSalary?: string;
  status?: string;
  teamLeadExperience?: string;
  technicalScore?: string;
  totalExperience?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface IInterview extends IApplicant {
  interviewerName?: string;
  interviewDetails?: IInterviewDetail[];
}

export interface IApplicant {
  id?: number;
  address?: string;
  age: number | undefined;
  university: string;
  city: string;
  cnic: string;
  createdAt?: string;
  createdBy?: string;
  email: string;
  fullName: string;
  gender: string;
  linkedinHandle?: string;
  education: string;
  interviewDetails?: Object[];
  interviewerName?: string;
  isDeleted?: boolean;
  phoneNumber: string;
  graduationYear: string;
  state: string;
  updatedAt?: string;
  updatedBy?: string;
}

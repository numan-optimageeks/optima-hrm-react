import { format } from "date-fns";

export const transformJobFieldValues = (editState) => {
  return {
    email: editState?.email || "",
    openingDate: editState?.openingDate || format(new Date(), "yyyy-MM-dd"),
    position: editState?.position || "",
    noOfHiring: editState?.noOfHiring || "",
    experiance: editState?.experiance || "",
    designation: editState?.designation || "",
    budget: editState?.budget || "",
    employmentType: editState?.employmentType || "",
    location: editState?.location || "",
    urgencyLevel: editState?.urgencyLevel || "",
    technicalSpecification: editState?.technicalSpecification || "",
    otherRequirements: editState?.otherRequirements || "",
    requestedBy: editState?.requestedBy || "",
  };
};

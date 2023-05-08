import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import Footer from "src/components/Footer";
import { DetailSection, StyledBody } from "./ViewInterview.style";
import BackButton from "src/components/BackButton/BackButton";
import { Typography } from "@mui/material";
import {
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const ViewInterview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: any = location?.state;
  return (
    <>
      <Helmet title="View Applicant" />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/interviews"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">View Interview Details</StyledViewLabel>
          <StyledBody>
            <DetailSection>
              <Typography variant={"h5"}>Applicant Name:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.fullName || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Current Experiance:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.currentCompanyExperience || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Total Experiance:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.totalExperience || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>TeamLead Experiance:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.teamLeadExperience || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Current Company:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.currentCompany || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Contact Person:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.companyContactPerson || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Interviewer Name:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.interviewerName || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Interviewe Status:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.status || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Current Salary:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.currentSalary || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Expected Salary:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.expectedSalary || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Notice Period:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.noticePeriod || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Applied For:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.appliedFor || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Interview Time:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.interviewTimings || ""}
              </Typography>
            </DetailSection>
          </StyledBody>
        </StyledViewContainer>
      </StyledViewRoot>

      <Footer />
    </>
  );
};
export default ViewInterview;

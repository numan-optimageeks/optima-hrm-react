import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import BackButton from "src/components/BackButton/BackButton";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";
import { IApplicant } from "../create/data/interface";
import InterviewDetails from "./components/interviewDetails/InterviewDetails";
import { DetailSection, StyledBody } from "./ViewApplicant.style";
import {
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const ViewApplicant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: IApplicant = location?.state;

  return (
    <>
      <Helmet title="View Applicant" />

      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/applicants"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">View Applicant</StyledViewLabel>
          <StyledBody>
            <DetailSection>
              <Typography variant={"h5"}>Name:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.fullName || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>E-mail:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.email || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Phone #:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.phoneNumber || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>CNIC:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.cnic || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Gender:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.gender || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Address:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.address || ""}
              </Typography>
            </DetailSection>
            <InterviewDetails />
          </StyledBody>
        </StyledViewContainer>
      </StyledViewRoot>

      <Footer />
    </>
  );
};
export default ViewApplicant;

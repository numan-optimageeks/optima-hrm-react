import { useLocation, useNavigate } from "react-router";
import { ICreateJob } from "../create/data/initialValues";
import { Helmet } from "react-helmet-async";
import {
  AssigneItem,
  AssigneList,
  AssigneSection,
  DetailSection,
  StyledBody,
  StyledStatus,
} from "./ViewJob.style";
import BackButton from "src/components/BackButton/BackButton";
import Footer from "src/components/Footer";
import { Avatar, Box, Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import {
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";
import defaultImage from "src/assests/images/default-profile.png";

const ViewJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: ICreateJob = location?.state;
  const assigneList = () => {
    return data?.assignedPositions?.map((val) => val?.user);
  };
  return (
    <>
      <Helmet title="View Position" />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/job-opportunities"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">View Position</StyledViewLabel>
          <StyledBody>
            <DetailSection>
              <Typography variant={"h5"}>E-mail:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.email || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Opening Date:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.openingDate || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Position:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.position || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>No of Hiring:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.noOfHiring || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Experiance:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.experiance || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Designation:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.designation || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Budget:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.budget || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Employment Type:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.employmentType || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Location:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.location || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Urgency Level:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.urgencyLevel || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Technical Specification:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.technicalSpecification || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Other Requirements:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.otherRequirements || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Requested By:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.requestedBy || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>Status:</Typography>
              <StyledStatus
                value={data?.status || ""}
                variant={"body1"}
                sx={{ marginLeft: "10px" }}
              >
                {data?.status || ""}
              </StyledStatus>
            </DetailSection>
            <AssigneSection>
              <Typography variant={"h5"}>Assignees:</Typography>
              {assigneList()?.map((user, index: number) => (
                <AssigneList>
                  <Avatar
                    variant="rounded"
                    alt={user?.full_name || ""}
                    src={
                      user?.image
                        ? `${process.env.REACT_APP_MAILING_BACKEND}/${user?.image}`
                        : defaultImage
                    }
                  />
                  <AssigneItem variant={"body1"} key={index}>
                    {user?.full_name}
                  </AssigneItem>
                </AssigneList>
              ))}
            </AssigneSection>
          </StyledBody>
        </StyledViewContainer>
      </StyledViewRoot>
      <Footer />
    </>
  );
};
export default ViewJob;

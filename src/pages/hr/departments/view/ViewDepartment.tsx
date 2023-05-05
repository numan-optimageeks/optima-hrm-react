import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { DetailSection, StyledBody } from "./ViewDepartment.style";
import { useLocation, useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import BackButton from "src/components/BackButton/BackButton";
import {
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

export interface IDepartment {
  id?: number;
  description?: string;
  department?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

const ViewDepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: IDepartment = location?.state;

  return (
    <>
      <Helmet title="View Department" />

      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/departments"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">View Department</StyledViewLabel>
          <StyledBody>
            <DetailSection>
              <Typography variant={"h5"}>Name:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.department || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>Description:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.description || ""}
              </Typography>
            </DetailSection>
          </StyledBody>
        </StyledViewContainer>
      </StyledViewRoot>

      <Footer />
    </>
  );
};
export default ViewDepartment;

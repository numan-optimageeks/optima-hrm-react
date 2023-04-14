import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import {
  DetailSection,
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./ViewDepartment.style";
import { useLocation, useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import BackButton from "src/components/BackButton/BackButton";

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

      <StyledRoot maxWidth="lg">
        <BackButton path={"/departments"} />
        <StyledContainer>
          <StyledLabel variant="h5">View Department</StyledLabel>
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
            <Box display={"flex"} justifyContent={"flex-end"}>
              <CustomButton
                variant="outlined"
                onClick={() => navigate("/departments")}
              >
                Go back
              </CustomButton>
            </Box>
          </StyledBody>
        </StyledContainer>
      </StyledRoot>

      <Footer />
    </>
  );
};
export default ViewDepartment;

import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import {
  DetailSection,
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./ViewDesignation.style";
import { useLocation, useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import BackButton from "src/components/BackButton/BackButton";
import { IDesignation } from "../../departments/create/data/interface";

const ViewDepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: IDesignation = location?.state;

  return (
    <>
      <Helmet title="View Designation" />

      <StyledRoot maxWidth="lg">
        <BackButton path={"/designations"} />
        <StyledContainer>
          <StyledLabel variant="h5">View Designation</StyledLabel>
          <StyledBody>
            <DetailSection>
              <Typography variant={"h5"}>Designation:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.designation || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>Abbreviation:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.abbreviation || ""}
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
                onClick={() => navigate("/designations")}
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

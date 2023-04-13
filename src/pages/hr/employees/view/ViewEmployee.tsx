import { useLocation, useNavigate } from "react-router";
import { IEmployee } from "../create/data/interface";
import { Helmet } from "react-helmet-async";
import {
  DetailSection,
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./ViewEmployee.style";
import Footer from "src/components/Footer";
import BackButton from "src/components/BackButton/BackButton";
import { Box, Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";

const ViewEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: IEmployee = location?.state;
  return (
    <>
      <Helmet title="View Employee" />
      <StyledRoot maxWidth="lg">
        <BackButton path={"/employees"} />
        <StyledContainer>
          <StyledLabel variant="h5">View Employee</StyledLabel>
          <StyledBody>
            <DetailSection>
              <Typography variant={"h5"}>Employee ID:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.employeeId || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>Status:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.state || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>Name:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.fullName || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Personal Email:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.email || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Phone #:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.contactDetail || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Company Email:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.companyEmail || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Work Type:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.workType || ""}
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
              <Typography variant={"h5"}>Date of Birth:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.dateOfBirth || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Joining Data:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.joiningDate || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Manager:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.managerId || ""}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant={"h5"}>Designation:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {/* @ts-ignore */}
                {data?.employeeDesignation?.designation || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>Department:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {/* @ts-ignore */}
                {data?.employeeDepartment?.department || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>city:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.city || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>state:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.state || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>Address:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.address || ""}
              </Typography>
            </DetailSection>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <CustomButton
                variant="outlined"
                onClick={() => navigate("/employees")}
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
export default ViewEmployee;

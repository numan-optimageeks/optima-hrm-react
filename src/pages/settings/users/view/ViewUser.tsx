import { useLocation, useNavigate } from "react-router";
import { IUser } from "../create/data/interface";
import { Helmet } from "react-helmet-async";
import {
  DetailSection,
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./ViewUser.style";
import BackButton from "src/components/BackButton/BackButton";
import { Box, Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";

const ViewUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: IUser = location?.state;

  return (
    <>
      <Helmet title="View User" />

      <StyledRoot maxWidth="lg">
        <BackButton path={"/users"} />
        <StyledContainer>
          <StyledLabel variant="h5">View User</StyledLabel>
          <StyledBody>
            <DetailSection>
              <Typography variant={"h5"}>Name:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.full_name || ""}
              </Typography>
            </DetailSection>
            <DetailSection>
              <Typography variant={"h5"}>E-mail:</Typography>
              <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
                {data?.email || ""}
              </Typography>
            </DetailSection>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <CustomButton
                variant="outlined"
                onClick={() => navigate("/users")}
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
export default ViewUser;

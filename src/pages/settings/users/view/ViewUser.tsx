import { useLocation, useNavigate } from "react-router";
import { IUser } from "../create/data/interface";
import { Helmet } from "react-helmet-async";
import { DetailSection, StyledBody } from "./ViewUser.style";
import BackButton from "src/components/BackButton/BackButton";
import { Box, Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";
import {
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const ViewUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: IUser = location?.state;

  return (
    <>
      <Helmet title="View User" />

      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/users"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">View User</StyledViewLabel>
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
        </StyledViewContainer>
      </StyledViewRoot>

      <Footer />
    </>
  );
};
export default ViewUser;

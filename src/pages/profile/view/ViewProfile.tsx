import { Helmet } from "react-helmet-async";
import {
  StyledListHeader,
  StyledViewContainer,
  StyledViewRoot,
} from "src/theme/styles";
import { StyledBody } from "./ViewProfile.style";
import { Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import { useNavigate } from "react-router";
import ProfileDetails from "./components/profileDetails/ProfileDetails";

const ViewProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet title="View Profile" />
      <StyledViewRoot maxWidth="lg">
        <StyledViewContainer>
          <StyledListHeader>
            <Typography variant="h5">View Profile</Typography>
            <CustomButton
              variant="contained"
              onClick={() => navigate("/profile/edit")}
            >
              Edit
            </CustomButton>
          </StyledListHeader>
          <StyledBody>
            <ProfileDetails />
          </StyledBody>
        </StyledViewContainer>
      </StyledViewRoot>
    </>
  );
};
export default ViewProfile;

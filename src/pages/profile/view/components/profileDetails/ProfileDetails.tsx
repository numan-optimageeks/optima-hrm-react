import { Typography } from "@mui/material";
import {
  DetailSection,
  StyledContainer,
  StyledImage,
  StyledImageContainer,
  StyledInfoSection,
  StyledSection,
} from "./ProfileDetails.style";
import defaultProfile from "src/assests/images/default-profile.png";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const ProfileDetails = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <StyledContainer>
      <StyledSection>
        <StyledImageContainer>
          <StyledImage src={user?.image || defaultProfile} alt="profile-icon" />
        </StyledImageContainer>
      </StyledSection>
      <StyledInfoSection>
        <DetailSection>
          <Typography variant={"h5"}>Name:</Typography>
          <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
            {user?.full_name || ""}
          </Typography>
        </DetailSection>
        <DetailSection>
          <Typography variant={"h5"}>Role:</Typography>
          <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
            {user?.role || ""}
          </Typography>
        </DetailSection>
        <DetailSection>
          <Typography variant={"h5"}>email:</Typography>
          <Typography variant={"body1"} sx={{ marginLeft: "10px" }}>
            {user?.email || ""}
          </Typography>
        </DetailSection>
      </StyledInfoSection>
    </StyledContainer>
  );
};

export default ProfileDetails;

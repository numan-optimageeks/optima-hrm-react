import { Helmet } from "react-helmet-async";
import BackButton from "src/components/BackButton/BackButton";
import {
  StyledCreateBody,
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";
import EditProfileForm from "./components/editProfileform/EditProfileForm";
import { useState } from "react";
import Loader from "src/components/Loader/Loader";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <Loader />}
      <Helmet title={"Edit Profile"} />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/profile"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">Edit Profile</StyledViewLabel>
          <StyledCreateBody>
            <EditProfileForm setLoading={setLoading} />
          </StyledCreateBody>
        </StyledViewContainer>
      </StyledViewRoot>
    </>
  );
};

export default EditProfile;

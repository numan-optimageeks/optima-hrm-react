import UpdatePassword from "../updatePassword/UpdatePassword";
import UpdateProfile from "../updateProfile/UpdateProfile";
import {
  StyledContainer,
  StyledInfoSection,
  StyledSection,
} from "./EditProfileForm.style";

const EditProfileForm = ({ setLoading }) => {
  return (
    <StyledContainer>
      <StyledSection>
        <UpdateProfile setLoading={setLoading} />
      </StyledSection>
      <StyledInfoSection>
        <UpdatePassword setLoading={setLoading} />
      </StyledInfoSection>
    </StyledContainer>
  );
};
export default EditProfileForm;

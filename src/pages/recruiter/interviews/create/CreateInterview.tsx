import { Helmet } from "react-helmet-async";
import {
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./CreateInterview.style";
import BackButton from "src/components/BackButton/BackButton";
import Footer from "src/components/Footer";
import Candidate from "./components/candidate/Candidate";
import EmployementDetails from "./components/employementDetails/EmployementDetails";

const CreateInterview = () => {
  return (
    <>
      <Helmet title="Applicant Details" />
      <StyledRoot maxWidth="lg">
        <BackButton path={"/interviews"} />
        <StyledContainer>
          <StyledLabel variant="h5">Applicant Details</StyledLabel>
          <StyledBody>
            <Candidate />
            <EmployementDetails />
          </StyledBody>
        </StyledContainer>
      </StyledRoot>

      <Footer />
    </>
  );
};
export default CreateInterview;

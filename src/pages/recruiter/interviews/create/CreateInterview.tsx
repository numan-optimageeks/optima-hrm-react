import { Helmet } from "react-helmet-async";
import BackButton from "src/components/BackButton/BackButton";
import Footer from "src/components/Footer";
import Candidate from "./components/candidate/Candidate";
import EmployementDetails from "./components/employementDetails/EmployementDetails";
import {
  StyledCreateBody,
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const CreateInterview = () => {
  return (
    <>
      <Helmet title="Applicant Details" />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/interviews"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">Applicant Details</StyledViewLabel>
          <StyledCreateBody>
            <Candidate />
            <EmployementDetails />
          </StyledCreateBody>
        </StyledViewContainer>
      </StyledViewRoot>

      <Footer />
    </>
  );
};
export default CreateInterview;

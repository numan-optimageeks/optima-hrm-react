import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import BackButton from "src/components/BackButton/BackButton";
import Footer from "src/components/Footer";
import CreateForm from "./components/createForm/CreateForm";
import { IApplicant } from "./data/interface";
import {
  StyledCreateBody,
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const CreateApplicant = () => {
  const location = useLocation();

  const editState: IApplicant = location?.state as IApplicant;
  return (
    <>
      <Helmet title={editState?.id ? "Edit Applicant" : "Create Applicant"} />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/applicants"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} Applicant
          </StyledViewLabel>
          <StyledCreateBody>
            <CreateForm />
          </StyledCreateBody>
        </StyledViewContainer>
      </StyledViewRoot>

      <Footer />
    </>
  );
};
export default CreateApplicant;

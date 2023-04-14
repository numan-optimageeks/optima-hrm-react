import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import BackButton from "src/components/BackButton/BackButton";
import Footer from "src/components/Footer";
import CreateForm from "./components/createForm/CreateForm";
import { StyledBody, StyledContainer, StyledLabel, StyledRoot } from "./CreateApplicant.style";
import { IApplicant } from "./data/interface";

const CreateApplicant = () => {
    const location = useLocation();
  
    const editState: IApplicant = location?.state;
    return (
      <>
        <Helmet title={editState?.id ? "Edit Applicant" : "Create Applicant"} />
        <StyledRoot maxWidth="lg">
          <BackButton path={"/applicants"} />
          <StyledContainer>
            <StyledLabel variant="h5">
              {editState?.id ? "Edit" : "Create"} Applicant
            </StyledLabel>
            <StyledBody>
              <CreateForm />
            </StyledBody>
          </StyledContainer>
        </StyledRoot>
  
        <Footer />
      </>
    );
  };
  export default CreateApplicant;
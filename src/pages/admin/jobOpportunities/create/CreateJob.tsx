import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import {
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./CreateJob.style";
import BackButton from "src/components/BackButton/BackButton";
import Footer from "src/components/Footer";
import CreateForm from "./components/createForm/CreateForm";

const CreateJob = () => {
  const location = useLocation();

  const editState: any = location?.state;
  return (
    <>
      <Helmet title={`${editState?.id ? "Edit" : "Create"} Job`} />
      <StyledRoot maxWidth="lg">
        <BackButton path={"/job-opportunities"} />
        <StyledContainer>
          <StyledLabel variant="h5">
            {`${editState?.id ? "Edit" : "Create"} Job`}
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
export default CreateJob;

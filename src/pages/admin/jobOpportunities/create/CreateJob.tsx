import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import BackButton from "src/components/BackButton/BackButton";
import Footer from "src/components/Footer";
import CreateForm from "./components/createForm/CreateForm";
import {
  StyledCreateBody,
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const CreateJob = () => {
  const location = useLocation();

  const editState: any = location?.state;
  return (
    <>
      <Helmet title={`${editState?.id ? "Edit" : "Create"} Job`} />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/job-opportunities"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">
            {`${editState?.id ? "Edit" : "Create"} Job`}
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
export default CreateJob;

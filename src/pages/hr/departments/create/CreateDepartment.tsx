import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import {
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./CreateDepartment.style";
import CreateForm from "./components/createForm/CreateForm";

const CreateDepartment = () => {
  return (
    <>
      <Helmet title="Create Department" />
      <StyledRoot maxWidth="lg">
        <StyledContainer>
          <StyledLabel variant="h5">Create Department</StyledLabel>
          <StyledBody>
            <CreateForm />
          </StyledBody>
        </StyledContainer>
      </StyledRoot>

      <Footer />
    </>
  );
};
export default CreateDepartment;

import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import {
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./CreateDepartment.style";
import CreateForm from "./components/createForm/CreateForm";
import { useLocation } from "react-router";
import { IDepartment } from "../view/ViewDepartment";
import BackButton from "src/components/BackButton/BackButton";

const CreateDepartment = () => {
  const location = useLocation();

  const editState: IDepartment = location?.state;

  return (
    <>
      <Helmet title="Create Department" />
      <StyledRoot maxWidth="lg">
        <BackButton path={"/departments"} />
        <StyledContainer>
          <StyledLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} Department
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
export default CreateDepartment;

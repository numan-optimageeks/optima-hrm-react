import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import CreateForm from "./components/createForm/CreateForm";
import { useLocation } from "react-router";
import { IDepartment } from "../view/ViewDepartment";
import BackButton from "src/components/BackButton/BackButton";
import {
  StyledCreateBody,
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const CreateDepartment = () => {
  const location = useLocation();

  const editState: IDepartment = location?.state;

  return (
    <>
      <Helmet title="Create Department" />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/departments"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} Department
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
export default CreateDepartment;

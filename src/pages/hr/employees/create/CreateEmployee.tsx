import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import {
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./CreateDesignation.style";
import CreateForm from "./components/createForm/CreateForm";

import BackButton from "src/components/BackButton/BackButton";
import { useLocation } from "react-router";
import { IEmployee } from "./data/interface";

const CreateDesignation = () => {
  const location = useLocation();

  const editState: IEmployee = location?.state;
  return (
    <>
      <Helmet title={editState?.id ? "Edit Employee" : "Create Employee"} />
      <StyledRoot maxWidth="lg">
        <BackButton path={"/employees"} />
        <StyledContainer>
          <StyledLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} Employee
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
export default CreateDesignation;

import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import CreateForm from "./components/createForm/CreateForm";

import BackButton from "src/components/BackButton/BackButton";
import { useLocation } from "react-router";
import { IEmployee } from "./data/interface";
import {
  StyledCreateBody,
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const CreateDesignation = () => {
  const location = useLocation();

  const editState: IEmployee = location?.state;
  return (
    <>
      <Helmet title={editState?.id ? "Edit Employee" : "Create Employee"} />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/employees"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} Employee
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
export default CreateDesignation;

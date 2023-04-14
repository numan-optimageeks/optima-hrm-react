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
import { IDesignation } from "../../departments/create/data/interface";

const CreateDesignation = () => {
  const location = useLocation();

  const editState: IDesignation = location?.state;
  return (
    <>
      <Helmet title="Create Designation" />
      <StyledRoot maxWidth="lg">
        <BackButton path={"/designations"} />
        <StyledContainer>
          <StyledLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} Designation
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

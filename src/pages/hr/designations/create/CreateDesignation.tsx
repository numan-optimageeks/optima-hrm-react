import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import CreateForm from "./components/createForm/CreateForm";

import BackButton from "src/components/BackButton/BackButton";
import { useLocation } from "react-router";
import { IDesignation } from "../../departments/create/data/interface";
import {
  StyledCreateBody,
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const CreateDesignation = () => {
  const location = useLocation();

  const editState: IDesignation = location?.state;
  return (
    <>
      <Helmet title="Create Designation" />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/designations"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} Designation
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

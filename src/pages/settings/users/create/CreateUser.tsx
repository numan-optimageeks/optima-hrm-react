import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { IUser } from "./data/interface";
import BackButton from "src/components/BackButton/BackButton";
import CreateForm from "./components/createForm/CreateForm";
import Footer from "src/components/Footer";
import {
  StyledCreateBody,
  StyledViewContainer,
  StyledViewLabel,
  StyledViewRoot,
} from "src/theme/styles";

const CreateUser = () => {
  const location = useLocation();

  const editState: IUser = location?.state;
  return (
    <>
      <Helmet title={editState?.id ? "Edit User" : "Create User"} />
      <StyledViewRoot maxWidth="lg">
        <BackButton path={"/users"} />
        <StyledViewContainer>
          <StyledViewLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} User
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
export default CreateUser;

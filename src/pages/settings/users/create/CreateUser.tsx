import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { IUser } from "./data/interface";
import {
  StyledBody,
  StyledContainer,
  StyledLabel,
  StyledRoot,
} from "./CreateUser.style";
import BackButton from "src/components/BackButton/BackButton";
import CreateForm from "./components/createForm/CreateForm";
import Footer from "src/components/Footer";

const CreateUser = () => {
  const location = useLocation();

  const editState: IUser = location?.state;
  return (
    <>
      <Helmet title={editState?.id ? "Edit User" : "Create User"} />
      <StyledRoot maxWidth="lg">
        <BackButton path={"/users"} />
        <StyledContainer>
          <StyledLabel variant="h5">
            {editState?.id ? "Edit" : "Create"} User
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
export default CreateUser;

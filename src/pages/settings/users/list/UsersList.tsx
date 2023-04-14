import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";
import { useAxios } from "src/hooks/useAxios";
import {
  SearchBox,
  StyledBody,
  StyledContainer,
  StyledHeader,
  StyledRoot,
} from "./Users.style";
import { Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";
import UserTable from "./components/userTable/userTable";

const UserList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const [userList, setUserList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteId = useRef("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await AxiosClient.post(`/users/`);
        setUserList(res?.data?.data || []);
        console.log("res", res?.data.data);
      } catch (err) {
        console.log("error while get users....");
      }
    };
    getUsers();
  }, []);

  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    const id = deleteId.current;
    try {
      await AxiosClient.delete(`/users/delete/${id}`);
      const filteredPosts = userList?.filter((item) => item?.id !== id);
      setUserList(filteredPosts);
    } catch (err) {
      console.log("Error while delete post", err);
    }
    setDeleteModal(false);
  };

  return (
    <>
      <Helmet title="Users" />
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteUser}
      />
      <StyledRoot maxWidth="lg">
        <StyledContainer>
          <StyledHeader>
            <Typography variant="h5">Users List</Typography>
            <SearchBox>
              <CustomInput
                type={"text"}
                id="search-department"
                placeholder="Search..."
              />
            </SearchBox>
            <CustomButton
              variant="contained"
              onClick={() => navigate("/users/create")}
            >
              Create User
            </CustomButton>
          </StyledHeader>
          <StyledBody>
            <UserTable userList={userList} handleDelete={handleDelete} />
          </StyledBody>
        </StyledContainer>
      </StyledRoot>
      <Footer />
    </>
  );
};
export default UserList;

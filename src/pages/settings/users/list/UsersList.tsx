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
import { transformError } from "src/helpers/transformError";
import { useToast } from "src/hooks/useToast";
import Loader from "src/components/Loader/Loader";

const UserList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const [userList, setUserList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteId = useRef("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await AxiosClient.post(`/users/`);
        setUserList(res?.data?.data || []);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    const id = deleteId.current;
    setLoading(true);
    try {
      await AxiosClient.delete(`/users/delete/${id}`);
      const filteredPosts = userList?.filter((item) => item?.id !== id);
      setUserList(filteredPosts);
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
    setDeleteModal(false);
    setLoading(false);
  };

  return (
    <>
      <Helmet title="Users" />
      {loading && <Loader />}
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

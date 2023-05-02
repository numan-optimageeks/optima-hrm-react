import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";
import { useAxios } from "src/hooks/useAxios";
import { Stack, Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";
import UserTable from "./components/userTable/userTable";
import { transformError } from "src/helpers/transformError";
import { useToast } from "src/hooks/useToast";
import Loader from "src/components/Loader/Loader";
import {
  StyledCreateBody,
  StyledListContainer,
  StyledListHeader,
  StyledSearchBox,
  StyledViewRoot,
} from "src/theme/styles";
import { useDebounce } from "src/hooks/useDebounce";
import { RootState } from "src/store/store";
import { useSelector } from "react-redux";

const UserList = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const [userList, setUserList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 400);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const deleteId = useRef("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const payload = {
          search: debouncedValue || "",
          page: paginationModel?.page + 1,
        };
        const searchRes = await AxiosClient.get(
          `/users/totalCount/?search=${debouncedValue || null}`
        );
        const res = await AxiosClient.post(`/users/`, payload);
        setPages(searchRes?.data?.data);
        setUserList(res?.data?.data || []);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
      setLoading(false);
    };
    getUsers();
  }, [debouncedValue, paginationModel?.page]);

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
      <StyledViewRoot maxWidth="lg">
        <StyledListContainer>
          <StyledListHeader>
            <Typography variant="h5">Users List</Typography>
            <StyledSearchBox>
              <CustomInput
                type={"text"}
                id="search-user"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
              />
            </StyledSearchBox>
            {user?.role === "admin" ? (
              <CustomButton
                variant="contained"
                onClick={() => navigate("/users/create")}
              >
                Create User
              </CustomButton>
            ) : (
              <Stack />
            )}
          </StyledListHeader>
          <StyledCreateBody>
            <UserTable
              userList={userList}
              handleDelete={handleDelete}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              pages={pages}
            />
          </StyledCreateBody>
        </StyledListContainer>
      </StyledViewRoot>
      <Footer />
    </>
  );
};
export default UserList;

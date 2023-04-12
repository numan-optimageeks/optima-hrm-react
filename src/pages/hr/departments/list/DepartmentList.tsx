import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import {
  SearchBox,
  StyledBody,
  StyledContainer,
  StyledHeader,
  StyledRoot,
} from "./DepartmentList.style";
import { Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import { useNavigate } from "react-router";
import CustomInput from "src/components/CustomInput/CustomInput";
import DepartmentTable from "./components/departmentTable/DepartmentTable";
import { useEffect, useRef, useState } from "react";
import { useAxios } from "src/hooks/useAxios";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";

const DepartmentList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const [departmentList, setDepartmentList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteId = useRef("");

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const payload = {
          isDeleted: false,
        };
        const res = await AxiosClient.post(
          `${process.env.REACT_APP_MAILING_BACKEND}/department/`,
          payload
        );
        setDepartmentList(res?.data?.data || []);
        console.log("res", res?.data.data);
      } catch (err) {
        console.log("error while get departments....");
      }
    };
    getDepartments();
  }, []);

  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteDepartment = async () => {
    const id = deleteId.current;
    try {
      await AxiosClient.delete(`/department/delete/${id}`);
      const filteredPosts = departmentList?.filter((item) => item?.id !== id);
      setDepartmentList(filteredPosts);
    } catch (err) {
      console.log("Error while delete post", err);
    }
    setDeleteModal(false);
  };

  return (
    <>
      <Helmet title="Departments" />
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteDepartment}
      />
      <StyledRoot maxWidth="lg">
        <StyledContainer>
          <StyledHeader>
            <Typography variant="h5">Departments List</Typography>
            <SearchBox>
              <CustomInput
                type={"text"}
                id="search-department"
                placeholder="Search..."
              />
            </SearchBox>
            <CustomButton
              variant="contained"
              onClick={() => navigate("/departments/create")}
            >
              Create Department
            </CustomButton>
          </StyledHeader>
          <StyledBody>
            <DepartmentTable
              departmentList={departmentList}
              handleDelete={handleDelete}
            />
          </StyledBody>
        </StyledContainer>
      </StyledRoot>
      <Footer />
    </>
  );
};

export default DepartmentList;

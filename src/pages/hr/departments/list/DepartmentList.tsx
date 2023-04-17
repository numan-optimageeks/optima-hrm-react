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
import { useDebounce } from "src/hooks/useDebounce";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";

const DepartmentList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const [departmentList, setDepartmentList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 400);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [pages, setPages] = useState(1);
  const deleteId = useRef("");

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const payload = {
          isDeleted: false,
          search: debouncedValue || "",
          page: paginationModel?.page + 1,
        };
        const searchRes = await AxiosClient.get(
          `/department/totalCount/?search=${debouncedValue || null}`
        );
        const res = await AxiosClient.post(`/department/`, payload);
        setPages(searchRes?.data?.data);
        setDepartmentList(res?.data?.data || []);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
    };
    getDepartments();
  }, [debouncedValue, paginationModel?.page]);

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
      toast.error(transformError(err)?.message);
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
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
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
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              pages={pages}
            />
          </StyledBody>
        </StyledContainer>
      </StyledRoot>
      <Footer />
    </>
  );
};

export default DepartmentList;

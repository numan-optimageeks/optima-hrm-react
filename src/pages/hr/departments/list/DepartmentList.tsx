import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
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
import Loader from "src/components/Loader/Loader";
import {
  StyledCreateBody,
  StyledListContainer,
  StyledListHeader,
  StyledSearchBox,
  StyledViewRoot,
} from "src/theme/styles";

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
  const [loading, setLoading] = useState(false);
  const deleteId = useRef("");

  useEffect(() => {
    const getDepartments = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    getDepartments();
  }, [debouncedValue, paginationModel?.page]);

  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteDepartment = async () => {
    const id = deleteId.current;
    setLoading(true);
    try {
      await AxiosClient.delete(`/department/delete/${id}`);
      const filteredPosts = departmentList?.filter((item) => item?.id !== id);
      setDepartmentList(filteredPosts);
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
    setDeleteModal(false);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <Helmet title="Departments" />
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteDepartment}
      />
      <StyledViewRoot maxWidth="lg">
        <StyledListContainer>
          <StyledListHeader>
            <Typography variant="h5">Departments List</Typography>
            <StyledSearchBox>
              <CustomInput
                type={"text"}
                id="search-department"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
              />
            </StyledSearchBox>
            <CustomButton
              variant="contained"
              onClick={() => navigate("/departments/create")}
            >
              Create Department
            </CustomButton>
          </StyledListHeader>
          <StyledCreateBody>
            <DepartmentTable
              departmentList={departmentList}
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

export default DepartmentList;

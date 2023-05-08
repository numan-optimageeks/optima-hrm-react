import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";
import { useAxios } from "src/hooks/useAxios";
import { Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import CustomButton from "src/components/CustomButton/CustomButton";
import EmployeeTable from "./components/employeeTable/EmployeeTable";
import Footer from "src/components/Footer";
import { useDebounce } from "src/hooks/useDebounce";
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

const EmployeeList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const [employeeList, setEmployeeList] = useState([]);
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
    const getEmployees = async () => {
      setLoading(true);
      try {
        const payload = {
          isDeleted: false,
          search: debouncedValue || "",
          page: paginationModel?.page + 1,
        };
        const searchRes = await AxiosClient.get(
          `/employee/totalCount/?search=${debouncedValue || null}`
        );
        const res = await AxiosClient.post(`/employee/`, payload);
        setEmployeeList(res?.data?.data || []);
        setPages(searchRes?.data?.data);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
      setLoading(false);
    };
    getEmployees();
  }, [debouncedValue, paginationModel?.page]);
  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteEmployee = async () => {
    const id = deleteId.current;
    setLoading(true);
    try {
      await AxiosClient.delete(`/employee/delete/${id}`);
      const filtered = employeeList?.filter((item) => item?.id !== id);
      setEmployeeList(filtered);
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
    setDeleteModal(false);
    setLoading(false);
  };
  return (
    <>
      {loading && <Loader />}
      <Helmet title="Employees" />
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteEmployee}
      />
      <StyledViewRoot maxWidth="lg">
        <StyledListContainer>
          <StyledListHeader>
            <Typography variant="h5">Employees List</Typography>
            <StyledSearchBox>
              <CustomInput
                type={"text"}
                id="search-designation"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
              />
            </StyledSearchBox>
            <CustomButton
              variant="contained"
              onClick={() => navigate("/employees/create")}
            >
              Create Employee
            </CustomButton>
          </StyledListHeader>
          <StyledCreateBody>
            <EmployeeTable
              employeeList={employeeList}
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
export default EmployeeList;

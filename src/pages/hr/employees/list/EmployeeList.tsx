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
} from "./EmployeeList.style";
import { Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import CustomButton from "src/components/CustomButton/CustomButton";
import EmployeeTable from "./components/employeeTable/EmployeeTable";
import Footer from "src/components/Footer";
import { useDebounce } from "src/hooks/useDebounce";

const EmployeeList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const [employeeList, setEmployeeList] = useState([]);
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
    const getEmployees = async () => {
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
        console.log("error while get Employees....");
      }
    };
    getEmployees();
  }, [debouncedValue, paginationModel?.page]);
  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteEmployee = async () => {
    const id = deleteId.current;
    try {
      await AxiosClient.delete(`/employee/delete/${id}`);
      const filtered = employeeList?.filter((item) => item?.id !== id);
      setEmployeeList(filtered);
    } catch (err) {
      console.log("Error while delete Employee", err);
    }
    setDeleteModal(false);
  };
  return (
    <>
      <Helmet title="Employees" />
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteEmployee}
      />
      <StyledRoot maxWidth="lg">
        <StyledContainer>
          <StyledHeader>
            <Typography variant="h5">Employees List</Typography>
            <SearchBox>
              <CustomInput
                type={"text"}
                id="search-designation"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
              />
            </SearchBox>
            <CustomButton
              variant="contained"
              onClick={() => navigate("/employees/create")}
            >
              Create Employee
            </CustomButton>
          </StyledHeader>
          <StyledBody>
            <EmployeeTable
              employeeList={employeeList}
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
export default EmployeeList;

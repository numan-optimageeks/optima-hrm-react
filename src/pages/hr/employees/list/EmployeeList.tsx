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

const EmployeeList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const [employeeList, setEmployeeList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteId = useRef("");

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const payload = {
          isDeleted: false,
        };
        const res = await AxiosClient.post(`/employee/`, payload);
        setEmployeeList(res?.data?.data || []);
        console.log("res", res?.data.data);
      } catch (err) {
        console.log("error while get Employees....");
      }
    };
    getEmployees();
  }, []);
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
            />
          </StyledBody>
        </StyledContainer>
      </StyledRoot>
      <Footer />
    </>
  );
};
export default EmployeeList;

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
} from "./DesignationList.style";
import { Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";
import DesignationTable from "./components/designationTable/DesignationTable";

const DesignationList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const [designationList, setDesignationList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteId = useRef("");

  useEffect(() => {
    const getDesignations = async () => {
      try {
        const payload = {
          isDeleted: false,
        };
        const res = await AxiosClient.post(`/designation/`, payload);
        setDesignationList(res?.data?.data || []);
        console.log("res", res?.data.data);
      } catch (err) {
        console.log("error while get designations....");
      }
    };
    getDesignations();
  }, []);
  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteDesignation = async () => {
    const id = deleteId.current;
    try {
      await AxiosClient.delete(`/designation/delete/${id}`);
      const filtered = designationList?.filter((item) => item?.id !== id);
      setDesignationList(filtered);
    } catch (err) {
      console.log("Error while delete designation", err);
    }
    setDeleteModal(false);
  };
  return (
    <>
      <Helmet title="Designations" />
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteDesignation}
      />
      <StyledRoot maxWidth="lg">
        <StyledContainer>
          <StyledHeader>
            <Typography variant="h5">Designation List</Typography>
            <SearchBox>
              <CustomInput
                type={"text"}
                id="search-designation"
                placeholder="Search..."
              />
            </SearchBox>
            <CustomButton
              variant="contained"
              onClick={() => navigate("/designations/create")}
            >
              Create Designation
            </CustomButton>
          </StyledHeader>
          <StyledBody>
            <DesignationTable
              designationList={designationList}
              handleDelete={handleDelete}
            />
          </StyledBody>
        </StyledContainer>
      </StyledRoot>
      <Footer />
    </>
  );
};
export default DesignationList;

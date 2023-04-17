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
import { useDebounce } from "src/hooks/useDebounce";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";

const DesignationList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const [designationList, setDesignationList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 400);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const toast = useToast();
  const [pages, setPages] = useState(1);
  const deleteId = useRef("");

  useEffect(() => {
    const getDesignations = async () => {
      try {
        const payload = {
          isDeleted: false,
          search: debouncedValue || "",
          page: paginationModel?.page + 1,
        };
        const searchRes = await AxiosClient.get(
          `/designation/totalCount/?search=${debouncedValue || null}`
        );
        const res = await AxiosClient.post(`/designation/`, payload);
        setDesignationList(res?.data?.data || []);
        setPages(searchRes?.data?.data);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
    };
    getDesignations();
  }, [debouncedValue, paginationModel?.page]);
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
      toast.error(transformError(err)?.message);
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
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
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
export default DesignationList;

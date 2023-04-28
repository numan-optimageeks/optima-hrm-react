import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";
import { useAxios } from "src/hooks/useAxios";
import { Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";
import DesignationTable from "./components/designationTable/DesignationTable";
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
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [pages, setPages] = useState(1);
  const deleteId = useRef("");

  useEffect(() => {
    const getDesignations = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    getDesignations();
  }, [debouncedValue, paginationModel?.page]);
  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteDesignation = async () => {
    const id = deleteId.current;
    setLoading(true);
    try {
      await AxiosClient.delete(`/designation/delete/${id}`);
      const filtered = designationList?.filter((item) => item?.id !== id);
      setDesignationList(filtered);
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
    setDeleteModal(false);
    setLoading(false);
  };
  return (
    <>
      <Helmet title="Designations" />
      {loading && <Loader />}
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteDesignation}
      />
      <StyledViewRoot maxWidth="lg">
        <StyledListContainer>
          <StyledListHeader>
            <Typography variant="h5">Designation List</Typography>
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
              onClick={() => navigate("/designations/create")}
            >
              Create Designation
            </CustomButton>
          </StyledListHeader>
          <StyledCreateBody>
            <DesignationTable
              designationList={designationList}
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
export default DesignationList;

import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import CustomButton from "src/components/CustomButton/CustomButton";
import CustomInput from "src/components/CustomInput/CustomInput";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";
import Footer from "src/components/Footer";
import { useAxios } from "src/hooks/useAxios";
import {
  SearchBox,
  StyledBody,
  StyledContainer,
  StyledHeader,
  StyledRoot,
} from "./ApplicantList.style";
import ApplicantTable from "./components/ApplicantTable/ApplicantTable";
import { useDebounce } from "src/hooks/useDebounce";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";
import Loader from "src/components/Loader/Loader";

const ApplicantList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const [applicantList, setApplicantList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 400);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const deleteId = useRef("");

  useEffect(() => {
    const getApplicants = async () => {
      setLoading(true);
      try {
        const payload = {
          isDeleted: false,
          search: debouncedValue || "",
          page: paginationModel?.page + 1,
        };
        const searchRes = await AxiosClient.get(
          `/applicant/totalCount/?search=${debouncedValue || null}`
        );
        const res = await AxiosClient.post(`/applicant/`, payload);
        setApplicantList(res?.data?.data || []);
        setPages(searchRes?.data?.data);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
      setLoading(false);
    };
    getApplicants();
  }, [debouncedValue, paginationModel?.page]);
  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteApplicant = async () => {
    const id = deleteId.current;
    setLoading(true);
    try {
      await AxiosClient.delete(`/applicant/delete/${id}`);
      const filtered = applicantList?.filter((item) => item?.id !== id);
      setApplicantList(filtered);
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
    setDeleteModal(false);
    setLoading(false);
  };
  return (
    <>
      <Helmet title="Applicants" />
      {loading && <Loader />}
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteApplicant}
      />
      <StyledRoot maxWidth="lg">
        <StyledContainer>
          <StyledHeader>
            <Typography variant="h5">Applicant List</Typography>
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
              onClick={() => navigate("/applicants/create")}
            >
              Create Applicant
            </CustomButton>
          </StyledHeader>
          <StyledBody>
            <ApplicantTable
              applicantList={applicantList}
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
export default ApplicantList;

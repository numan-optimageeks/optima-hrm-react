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
} from "./InterviewList.style";
import { Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import Footer from "src/components/Footer";
import InterviewTable from "./InterviewTable/InterviewTable";
import { useDebounce } from "src/hooks/useDebounce";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";

const InterviewList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const [applicantList, setApplicantList] = useState([]);
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
    const getApplicants = async () => {
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
    };
    getApplicants();
  }, [debouncedValue, paginationModel?.page]);
  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteInterview = async () => {
    const id = deleteId.current;
    try {
      await AxiosClient.delete(`/interview/delete/${id}`);
      const filtered = applicantList?.filter((item) => item?.id !== id);
      setApplicantList(filtered);
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
    setDeleteModal(false);
  };
  return (
    <>
      <Helmet title="Interviews" />
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteInterview}
      />
      <StyledRoot maxWidth="lg">
        <StyledContainer>
          <StyledHeader>
            <Typography variant="h5">Interview List</Typography>
            <SearchBox>
              <CustomInput
                type={"text"}
                id="search-interview"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
              />
            </SearchBox>
            <div />
          </StyledHeader>
          <StyledBody>
            <InterviewTable
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
export default InterviewList;

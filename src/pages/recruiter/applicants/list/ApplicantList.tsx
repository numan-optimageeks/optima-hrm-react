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

const ApplicantList = () => {
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
        console.log("error while get applicant....");
      }
    };
    getApplicants();
  }, [debouncedValue, paginationModel?.page]);
  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteApplicant = async () => {
    const id = deleteId.current;
    try {
      await AxiosClient.delete(`/applicant/delete/${id}`);
      const filtered = applicantList?.filter((item) => item?.id !== id);
      setApplicantList(filtered);
    } catch (err) {
      console.log("Error while delete Applicant", err);
    }
    setDeleteModal(false);
  };
  return (
    <>
      <Helmet title="Applicants" />
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

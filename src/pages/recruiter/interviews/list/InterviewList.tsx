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

const InterviewList = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const [applicantList, setApplicantList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteId = useRef("");
  useEffect(() => {
    const getApplicants = async () => {
      try {
        const payload = {
          isDeleted: false,
        };
        const res = await AxiosClient.post(`/applicant/`, payload);
        setApplicantList(res?.data?.data || []);
        console.log("res", res?.data.data);
      } catch (err) {
        console.log("error while get applicant....");
      }
    };
    getApplicants();
  }, []);
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
      console.log("Error while delete Applicant", err);
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
              />
            </SearchBox>
            <div />
          </StyledHeader>
          <StyledBody>
            <InterviewTable
              applicantList={applicantList}
              handleDelete={handleDelete}
            />
          </StyledBody>
        </StyledContainer>
      </StyledRoot>
      <Footer />
    </>
  );
};
export default InterviewList;

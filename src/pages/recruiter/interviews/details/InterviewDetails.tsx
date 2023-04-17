import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";
import { useAxios } from "src/hooks/useAxios";
import {
  StyledBody,
  StyledContainer,
  StyledHeader,
  StyledRoot,
} from "./InterviewDetails.style";
import { Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";
import DetailsTable from "./components/detailsTable/DetailsTable";
import { transformError } from "src/helpers/transformError";
import { useToast } from "src/hooks/useToast";

const InterviewDetails = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const AxiosClient = useAxios();
  const [applicantList, setApplicantList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteId = useRef("");
  const toast = useToast();
  useEffect(() => {
    const getApplicants = async () => {
      const editstate = location?.state;
      try {
        const payload = {
          isDeleted: false,
        };
        const res = await AxiosClient.post(`/applicant/`, payload);
        const data = res?.data?.data;
        const current = data?.find((item) => item?.id === editstate?.id);
        const mapped = current?.interviewDetails?.map((val) => {
          return {
            fullName: current?.fullName || "",
            interviewerName: current?.interviewerName || "",
            ...val,
          };
        });
        setApplicantList(mapped || []);
      } catch (err) {
        toast.error(transformError(err)?.message);
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
            <CustomButton
              variant="contained"
              onClick={() =>
                navigate("/interviews/create", {
                  state: { candidate: location?.state },
                })
              }
            >
              Schedule New
            </CustomButton>
          </StyledHeader>
          <StyledBody>
            <DetailsTable
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
export default InterviewDetails;

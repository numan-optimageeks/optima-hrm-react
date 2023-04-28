import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";
import { useAxios } from "src/hooks/useAxios";
import {
  StyledBody,
  StyledContainer,
  StyledHeader,
} from "./InterviewDetails.style";
import { Typography } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import Footer from "src/components/Footer";
import DetailsTable from "./components/detailsTable/DetailsTable";
import { transformError } from "src/helpers/transformError";
import { useToast } from "src/hooks/useToast";
import Loader from "src/components/Loader/Loader";
import { StyledViewRoot } from "src/theme/styles";

const InterviewDetails = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const AxiosClient = useAxios();
  const [applicantList, setApplicantList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteId = useRef("");
  const toast = useToast();
  useEffect(() => {
    const getApplicants = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    getApplicants();
  }, []);
  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteInterview = async () => {
    const id = deleteId.current;
    setLoading(true);
    try {
      await AxiosClient.delete(`/interview/delete/${id}`);
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
      <Helmet title="Interviews" />
      {loading && <Loader />}
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteInterview}
      />
      <StyledViewRoot maxWidth="lg">
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
      </StyledViewRoot>
      <Footer />
    </>
  );
};
export default InterviewDetails;

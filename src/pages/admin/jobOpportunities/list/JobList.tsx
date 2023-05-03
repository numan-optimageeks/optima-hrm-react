import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import DeleteAlert from "src/components/DeleteModal/DeleteModal";
import Footer from "src/components/Footer";
import Loader from "src/components/Loader/Loader";
import { transformError } from "src/helpers/transformError";
import { useAxios } from "src/hooks/useAxios";
import { useDebounce } from "src/hooks/useDebounce";
import { useToast } from "src/hooks/useToast";
import { Stack, Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import CustomButton from "src/components/CustomButton/CustomButton";
import JobsListTable from "./components/jobsList/JobsTableList";
import {
  StyledCreateBody,
  StyledListContainer,
  StyledListHeader,
  StyledSearchBox,
  StyledViewRoot,
} from "src/theme/styles";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const JobList = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const AxiosClient = useAxios();
  const toast = useToast();
  const [jobsList, setJobsList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 400);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const deleteId = useRef("");

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      try {
        const payload = {
          isDeleted: false,
          search: debouncedValue || "",
          page: paginationModel?.page + 1,
        };
        const searchRes = await AxiosClient.get(
          `/job-position/totalCount/?search=${debouncedValue || null}`
        );
        const res = await AxiosClient.post(`/job-position/`, payload);
        setPages(searchRes?.data?.data);
        setJobsList(res?.data?.data || []);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
      setLoading(false);
    };
    getJobs();
  }, [debouncedValue, paginationModel?.page]);

  const handleDelete = (id: string) => {
    deleteId.current = id;
    setDeleteModal(true);
  };
  const handleDeleteJob = async () => {
    const id = deleteId.current;
    setLoading(true);
    try {
      await AxiosClient.delete(`/job-position/delete/${id}`);
      const filteredPosts = jobsList?.filter((item) => item?.id !== id);
      setJobsList(filteredPosts);
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
    setDeleteModal(false);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <Helmet title="Jobs List" />
      <DeleteAlert
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleYes={handleDeleteJob}
      />
      <StyledViewRoot maxWidth="lg">
        <StyledListContainer>
          <StyledListHeader>
            <Typography variant="h5">Jobs List</Typography>
            <StyledSearchBox>
              <CustomInput
                type={"text"}
                id="search-job"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
              />
            </StyledSearchBox>
            {user?.role === "admin" ? (
              <CustomButton
                variant="contained"
                onClick={() => navigate("/job-opportunities/create")}
              >
                Create Job Opportunity
              </CustomButton>
            ) : (
              <Stack />
            )}
          </StyledListHeader>
          <StyledCreateBody>
            <JobsListTable
              jobsList={jobsList}
              handleDelete={handleDelete}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              pages={pages}
              setJobsList={setJobsList}
            />
          </StyledCreateBody>
        </StyledListContainer>
      </StyledViewRoot>
      <Footer />
    </>
  );
};
export default JobList;

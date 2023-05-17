import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CustomInput from "src/components/CustomInput/CustomInput";
import Footer from "src/components/Footer";
import { useAxios } from "src/hooks/useAxios";
import { useDebounce } from "src/hooks/useDebounce";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";
import Loader from "src/components/Loader/Loader";
import { GridColDef } from "@mui/x-data-grid";
import { StyledBox, StyledTable } from "./positions-tracking.style";
import { Stack } from "@mui/material";
import CustomPagination from "src/components/CustomPagination/CustomPagination";
import {
  StyledCreateBody,
  StyledListContainer,
  StyledListHeader,
  StyledSearchBox,
  StyledViewRoot,
} from "src/theme/styles";

const columns: GridColDef[] = [
  {
    field: "position",
    headerName: "Name",
    disableColumnMenu: true,
    minWidth: 180,
  },
  {
    field: "noOfHiring",
    headerName: "Number of Positions",
    disableColumnMenu: true,
    minWidth: 180,
  },
  {
    field: "employmentType",
    headerName: "Vacancy Type",
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: "status",
    headerName: "Status",
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: "interviews",
    headerName: "Interviews",
    disableColumnMenu: true,
    minWidth: 130,
    renderCell: (params) => {
      return params.row?.interviews?.length;
    },
  },
  {
    field: "shortListed",
    headerName: "Short Listed",
    disableColumnMenu: true,
    minWidth: 120,
    renderCell: (params) => {
      return params.row?.interviews?.length
        ? params.row?.interviews.filter(
            (interview) => interview.status === "ShortListed"
          ).length
        : 0;
    },
  },
  {
    field: "selected",
    headerName: "Selection",
    disableColumnMenu: true,
    minWidth: 120,
    renderCell: (params) => {
      return params.row?.interviews?.length
        ? params.row?.interviews.filter(
            (interview) => interview.status === "Selected"
          ).length
        : 0;
    },
  },
  {
    field: "offerSend",
    headerName: "Offer Letter",
    disableColumnMenu: true,
    minWidth: 120,
    renderCell: (params) => {
      return params.row?.interviews?.length
        ? params.row?.interviews.filter(
            (interview) => interview.status === "OfferSend"
          ).length
        : 0;
    },
  },
];

const PositionsTracking = () => {
  const AxiosClient = useAxios();
  const toast = useToast();
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 400);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const res = await AxiosClient.post(`/job-position/`, {});
        const rows = res.data?.data;
        const pages = res.data?.data?.total;
        setPositions(rows || []);
        setPages(pages);
      } catch (err) {
        toast.error(transformError(err)?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  return (
    <>
      <Helmet title="Positions Tracking" />
      {loading && <Loader />}
      <StyledViewRoot maxWidth="lg">
        <StyledListContainer>
          <StyledListHeader>
            <Typography variant="h5">Positions Tracking</Typography>
            <StyledSearchBox>
              <CustomInput
                type={"text"}
                id="search-designation"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e?.target?.value)}
                value={debouncedValue}
              />
            </StyledSearchBox>
          </StyledListHeader>
          <StyledCreateBody>
            <StyledBox rows={positions?.length}>
              <StyledTable
                rows={positions}
                columns={columns}
                rowCount={pages}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                disableRowSelectionOnClick
                slots={{
                  noRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No Data Found!
                    </Stack>
                  ),
                  pagination: CustomPagination,
                }}
              />
            </StyledBox>
          </StyledCreateBody>
        </StyledListContainer>
      </StyledViewRoot>
      <Footer />
    </>
  );
};

export default PositionsTracking;

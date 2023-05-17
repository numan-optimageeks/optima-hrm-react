import { useLocation, useNavigate } from "react-router";
import { IApplicant } from "../../../create/data/interface";
import { StyledBox, StyledHeader, StyledTable } from "./InterviewDetails.style";
import { GridColDef } from "@mui/x-data-grid";
import CustomButton from "src/components/CustomButton/CustomButton";
import { Stack } from "@mui/material";

const InterviewDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state as IApplicant;

  const columns: GridColDef[] = [
    {
      field: "appliedFor",
      headerName: "Applied For",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
    },
    {
      field: "interviewerName",
      headerName: "Interviwer",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
    },
    {
      field: "interviewTimings",
      headerName: "Interview Time",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
    },
    {
      field: "recommendationStatus",
      headerName: "Recomendation",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,
      minWidth: 100,
      renderCell: (params) => (
        <CustomButton variant={"outlined"}>View</CustomButton>
      ),
    },
  ];
  return (
    <>
      <StyledHeader variant="h5">Interviews Details</StyledHeader>
      <StyledBox rows={data?.interviewDetails?.length}>
        <StyledTable
          rows={data?.interviewDetails}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No Data Found!
              </Stack>
            ),
          }}
        />
      </StyledBox>
    </>
  );
};
export default InterviewDetails;

import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { LinkIcon } from "src/pages/hr/departments/list/components/departmentTable/DepartmentTable";
import ListIcon from "@mui/icons-material/List";
import { StyledBox, StyledTable } from "./InterviewTable.style";

const InterviewTable = ({ applicantList = [], handleDelete }) => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Name",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
    },
    {
      field: "interviewerName",
      headerName: "Interviwer",
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: "time",
      headerName: "Interview Time",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
      valueGetter: (params) => {
        const interviews = params?.row?.interviewDetails;
        return interviews?.length > 0
          ? interviews[interviews?.length - 1]?.interviewTimings
          : "";
      },
    },

    {
      field: "interviewDetails",
      headerName: "Last Status",
      disableColumnMenu: true,
      minWidth: 100,
      valueGetter: (params) => {
        const interviews = params?.row?.interviewDetails;
        return interviews?.length > 0
          ? interviews[interviews?.length - 1]?.status
          : "";
      },
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <LinkIcon
          title="View Details"
          onClick={() =>
            navigate("/interviews/details", { state: params?.row })
          }
          component={<ListIcon />}
        />
      ),
      minWidth: 100,
    },
  ];
  return (
    <StyledBox rows={applicantList?.length}>
      <StyledTable
        rows={applicantList?.length > 0 ? applicantList : []}
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
  );
};
export default InterviewTable;

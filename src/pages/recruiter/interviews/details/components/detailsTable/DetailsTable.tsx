import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { LinkIcon } from "src/pages/hr/departments/list/components/departmentTable/DepartmentTable";
import { StyledBox, StyledTable } from "./DetailsTable.style";

const DetailsTable = ({ applicantList, handleDelete }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const editstate = location?.state;
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
      flex: 2,
      minWidth: 150,
    },
    {
      field: "interviewTimings",
      headerName: "Time",
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: "appliedFor",
      headerName: "Applied For",
      disableColumnMenu: true,
      minWidth: 100,
    },
    {
      field: "expectedSalary",
      headerName: "Expected Salary",
      disableColumnMenu: true,
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <LinkIcon
            title="View"
            onClick={() => navigate("/interviews/view", { state: params?.row })}
            component={<VisibilityIcon />}
          />
          <LinkIcon
            title="Edit"
            onClick={() =>
              navigate("/interviews/create", {
                state: { interview: params?.row, candidate: editstate },
              })
            }
            component={<CreateIcon />}
          />
          <LinkIcon
            title="Delete"
            onClick={() => handleDelete(params?.row?.id)}
            component={<DeleteIcon />}
          />
        </>
      ),
      minWidth: 150,
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
export default DetailsTable;

import { Stack } from "@mui/material";
import { StyledBox, StyledTable } from "./JobsTableList.style";
import CustomPagination from "src/components/CustomPagination/CustomPagination";
import { useNavigate } from "react-router";
import { GridColDef } from "@mui/x-data-grid";
import { LinkIcon } from "src/pages/hr/departments/list/components/departmentTable/DepartmentTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

const JobsListTable = ({
  jobsList,
  handleDelete,
  paginationModel,
  setPaginationModel,
  pages,
}) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "position",
      headerName: "Position",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 250,
    },
    {
      field: "experiance",
      headerName: "Experiance",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "noOfHiring",
      headerName: "No of hiring",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "urgencyLevel",
      headerName: "Urgency level",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 150,
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
            onClick={() =>
              navigate("/job-opportunities/view", { state: params?.row })
            }
            component={<VisibilityIcon />}
          />
          <LinkIcon
            title="Edit"
            onClick={() =>
              navigate("/job-opportunities/create", { state: params?.row })
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
    <StyledBox rows={jobsList?.length}>
      <StyledTable
        rows={jobsList}
        rowCount={pages}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No Data Found!
            </Stack>
          ),
          pagination: CustomPagination,
        }}
      />
    </StyledBox>
  );
};
export default JobsListTable;

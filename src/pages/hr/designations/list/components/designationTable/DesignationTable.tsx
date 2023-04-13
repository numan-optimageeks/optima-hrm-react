import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { LinkIcon } from "src/pages/hr/departments/list/components/departmentTable/DepartmentTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledBox, StyledTable } from "./DesignationTable.style";
import { Stack } from "@mui/material";

const DesignationTable = ({ designationList, handleDelete }) => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "designation",
      headerName: "Designation",
      disableColumnMenu: true,
      flex: 4,
      minWidth: 250,
    },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      disableColumnMenu: true,
      flex: 4,
      minWidth: 250,
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
              navigate("/designations/view", { state: params?.row })
            }
            component={<VisibilityIcon />}
          />
          <LinkIcon
            title="Edit"
            onClick={() =>
              navigate("/designations/create", { state: params?.row })
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
    <StyledBox rows={designationList?.length}>
      <StyledTable
        rows={designationList}
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
export default DesignationTable;

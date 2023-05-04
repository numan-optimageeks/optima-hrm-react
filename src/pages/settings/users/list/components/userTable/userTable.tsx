import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { LinkIcon } from "src/pages/hr/departments/list/components/departmentTable/DepartmentTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";
import { StyledBox, StyledRole, StyledTable } from "./userTable.module";
import CustomPagination from "src/components/CustomPagination/CustomPagination";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const UserTable = ({
  userList,
  handleDelete,
  paginationModel,
  setPaginationModel,
  pages,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "full_name",
      headerName: "Name",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 250,
    },
    {
      field: "email",
      headerName: "E-mail",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 250,
    },
    {
      field: "role",
      headerName: "Role",
      disableColumnMenu: true,
      minWidth: 100,
      renderCell: (params) => <StyledRole>{params?.row?.role}</StyledRole>,
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
            onClick={() => navigate("/users/view", { state: params?.row })}
            component={<VisibilityIcon />}
          />
          <LinkIcon
            title="Edit"
            onClick={() => navigate("/users/create", { state: params?.row })}
            component={<CreateIcon />}
          />
          {params?.row.role === "admin" ? (
            <></>
          ) : (
            <LinkIcon
              title="Delete"
              onClick={() => handleDelete(params?.row?.id)}
              component={<DeleteIcon />}
            />
          )}
        </>
      ),
      minWidth: 150,
    },
  ];
  const getColumns = () => {
    if (user?.role === "hr") {
      return columns?.filter((col) => col?.field !== "actions");
    }
    return columns;
  };

  return (
    <StyledBox rows={userList?.length}>
      <StyledTable
        rows={userList}
        rowCount={pages}
        columns={getColumns()}
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
export default UserTable;

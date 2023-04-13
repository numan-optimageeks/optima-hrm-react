import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { LinkIcon } from "src/pages/hr/departments/list/components/departmentTable/DepartmentTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledBox, StyledTable } from "./EmployeeTable.style";
import { Stack } from "@mui/material";

const EmployeeTable = ({ employeeList, handleDelete }) => {
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
      field: "email",
      headerName: "Email",
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
    },
    {
      field: "employeeDesignation",
      headerName: "Designation",
      disableColumnMenu: true,
      minWidth: 150,
      valueGetter: (params) => params?.row?.employeeDesignation?.designation,
    },
    {
      field: "employeeDepartment",
      headerName: "Department",
      disableColumnMenu: true,
      minWidth: 150,
      valueGetter: (params) => params?.row?.employeeDepartment?.department,
    },
    {
      field: "status",
      headerName: "Status",
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
            onClick={() => navigate("/employees/view", { state: params?.row })}
            component={<VisibilityIcon />}
          />
          <LinkIcon
            title="Edit"
            onClick={() =>
              navigate("/employees/create", { state: params?.row })
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
    <StyledBox rows={employeeList?.length}>
      <StyledTable
        rows={employeeList}
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
export default EmployeeTable;

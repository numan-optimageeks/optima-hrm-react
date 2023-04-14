import { GridColDef } from "@mui/x-data-grid";
import { LinkIcon } from "src/pages/hr/departments/list/components/departmentTable/DepartmentTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { StyledBox, StyledTable } from "./ApplicantTable.style";
import { Stack } from "@mui/material";

const ApplicantTable = ({ applicantList, handleDelete }) => {
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
      field: "phoneNumber",
      headerName: "Phone",
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: "cnic",
      headerName: "CNIC",
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      disableColumnMenu: true,
      minWidth: 100,
    },
    {
      field: "interviewDetails",
      headerName: "Last Status",
      disableColumnMenu: true,
      minWidth: 100,
      valueGetter: (params) => params?.row?.interviewDetails[0]?.status,
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
            onClick={() => navigate("/applicants/view", { state: params?.row })}
            component={<VisibilityIcon />}
          />
          <LinkIcon
            title="Edit"
            onClick={() =>
              navigate("/applicants/create", { state: params?.row })
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
        rows={applicantList}
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
export default ApplicantTable;

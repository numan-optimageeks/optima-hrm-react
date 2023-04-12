import { GridColDef } from "@mui/x-data-grid";
import { StyledBox, StyledTable } from "./DepartmentTable.style";
import { IconButton, Stack, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

const DepartmentTable = ({ departmentList }) => {
  const columns: GridColDef[] = [
    {
      field: "department",
      headerName: "Department",
      disableColumnMenu: true,
      flex: 6,
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
            onClick={() => console.log("params", params)}
            component={<VisibilityIcon />}
          />
          <LinkIcon
            title="Edit"
            onClick={() => {}}
            component={<CreateIcon />}
          />
          <LinkIcon
            title="Delete"
            onClick={() => {}}
            component={<DeleteIcon />}
          />
        </>
      ),
      minWidth: 150,
    },
  ];

  return (
    <StyledBox rows={departmentList?.length}>
      <StyledTable
        rows={departmentList}
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
export default DepartmentTable;

interface ILinkIcon {
  title: string;
  component: JSX.Element;
  onClick?: () => void;
}

export const LinkIcon: React.FC<ILinkIcon> = ({
  title,
  component,
  onClick,
}) => {
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={() => {
          onClick && onClick();
        }}
      >
        {component}
      </IconButton>
    </Tooltip>
  );
};

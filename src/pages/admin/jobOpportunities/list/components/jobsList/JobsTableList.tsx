import { Stack } from "@mui/material";
import { StyledBox, StyledStatus, StyledTable } from "./JobsTableList.style";
import CustomPagination from "src/components/CustomPagination/CustomPagination";
import { useNavigate } from "react-router";
import { GridColDef } from "@mui/x-data-grid";
import { LinkIcon } from "src/pages/hr/departments/list/components/departmentTable/DepartmentTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import AssignPosition from "../assignPosition/AssignPosition";
import { useEffect, useState } from "react";
import { useAxios } from "src/hooks/useAxios";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";

const JobsListTable = ({
  jobsList,
  handleDelete,
  paginationModel,
  setPaginationModel,
  pages,
  setJobsList,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const AxiosClient = useAxios();
  const toast = useToast();
  const navigate = useNavigate();
  const [hrList, setHrList] = useState([]);

  useEffect(() => {
    const getHrList = async () => {
      try {
        const res = await AxiosClient.get(`/users/hrList`);
        const data = res?.data?.data;
        const otherHrs = data?.filter((h) => h?.id !== user?.id);
        setHrList(otherHrs);
      } catch (error) {
        toast.error(transformError(error)?.message);
      }
    };
    getHrList();
  }, []);

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
      field: "status",
      headerName: "Status",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => (
        <StyledStatus value={row?.status}>{row?.status}</StyledStatus>
      ),
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
          {user?.role === "admin" ? (
            <LinkIcon
              title="Delete"
              onClick={() => handleDelete(params?.row?.id)}
              component={<DeleteIcon />}
            />
          ) : (
            <AssignPosition
              hrList={hrList}
              position={params?.row}
              jobsList={jobsList}
              setJobsList={setJobsList}
            />
          )}
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

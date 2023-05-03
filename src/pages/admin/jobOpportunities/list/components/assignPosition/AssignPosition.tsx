import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Tooltip,
  IconButton,
  MenuItem,
  Divider,
  Checkbox,
} from "@mui/material";
import { StyledAssignBtn, StyledMenu } from "./AssignPosition.style";
import { useAxios } from "src/hooks/useAxios";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const AssignPosition = ({ hrList, position, jobsList, setJobsList }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const AxiosClient = useAxios();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (position && position?.assignedPositions?.length > 0) {
      const ids = [];
      position?.assignedPositions?.forEach((singlePosition) => {
        ids.push(singlePosition?.userId);
      });
      const uniqueIds = new Set([...ids]);
      setSelected([...uniqueIds]);
    }
  }, []);

  const handleClose = async (assignMe = false) => {
    const selectedPosition = position?.assignedPositions || [];
    const newSelected = selected?.filter(
      (id) => !selectedPosition?.some((item) => item?.userId === id)
    );
    if (!isAssignedToMe() && assignMe) newSelected?.push(user?.id);
    const deSelected = selectedPosition?.filter(
      (val) => !selected?.includes(val?.userId)
    );
    const deSelectedIds = deSelected?.map((val) => val?.id);
    if (isAssignedToMe() && assignMe) deSelectedIds?.push(user?.id);

    const payload = {
      userId: newSelected,
      positionId: position?.id,
      deSelected: deSelectedIds,
    };

    const res = await AxiosClient.post(`/assign-position/create`, payload);
    const data = res?.data?.data;
    const filterActive = selectedPosition?.filter(
      (pos) => !deSelectedIds?.includes(pos.id)
    );
    const updated = [...filterActive, ...data];
    const jobsCopy = [...jobsList];
    const target = jobsCopy?.find((job) => job?.id === position?.id);
    target.assignedPositions = [...updated];
    setJobsList(jobsCopy);

    setAnchorEl(null);
  };
  const handleAssignMe = () => {
    handleClose(true);
  };
  const handleItemClick = (id: number) => {
    if (selected?.includes(id)) {
      const filtered = selected?.filter((item) => item !== id);
      setSelected(filtered);
    } else {
      setSelected([...selected, id]);
    }
  };
  const isAssignedToMe = () => {
    return position?.assignedPositions?.some((val) => val?.userId === user?.id);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  return (
    <>
      <IconButton
        aria-label="assign-position"
        id="assign-position"
        aria-controls={open ? "assign-position" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Tooltip title={"More"}>
          <MoreVertIcon />
        </Tooltip>
      </IconButton>
      <StyledMenu
        id="assign-position"
        MenuListProps={{
          "aria-labelledby": "assign-position",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(false)}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "200px",
          },
        }}
      >
        <StyledAssignBtn onClick={handleAssignMe}>
          {isAssignedToMe() ? "Unassign from me" : "Assign to me"}
        </StyledAssignBtn>
        <Divider />

        {hrList?.map((option) => (
          <MenuItem
            key={option?.id}
            onClick={() => handleItemClick(option?.id)}
          >
            <Checkbox checked={selected?.includes(option?.id)} />
            <span>{option?.full_name || ""}</span>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};
export default AssignPosition;

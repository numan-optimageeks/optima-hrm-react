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
import { IUser } from "src/pages/settings/users/create/data/interface";
import { useAxios } from "src/hooks/useAxios";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const AssignPosition = ({ hrList, position, jobsList, setJobsList }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const AxiosClient = useAxios();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState([]);
  const [initialIds, setInitialIds] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (position && position?.assignedPositions?.length > 0) {
      const ids = [];
      position?.assignedPositions?.forEach((singlePosition) => {
        ids.push(singlePosition?.userId);
      });
      const uniqueIds = new Set([...ids]);
      setSelected([...uniqueIds]);
      setInitialIds(JSON.parse(JSON.stringify([...uniqueIds])));
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = async (assignMe = false) => {
    if (selected?.length > -1 || assignMe) {
      const payload = {
        userId: selected,
        positionId: position?.id,
        deSelected: [],
      };
      if (assignMe) {
        const filtered = selected?.filter((userId) => userId !== user?.id);
        filtered.push(user?.id);
        payload.userId = filtered;
      }
      const deSelected = [];
      const newSelected = [];
      initialIds?.forEach((userId) => {
        if (!selected?.includes(userId)) deSelected.push(userId);
      });
      selected?.forEach((userId) => {
        if (!initialIds?.includes(userId)) newSelected.push(userId);
      });
      payload.deSelected = deSelected;
      payload.userId = newSelected;
      const res = await AxiosClient.post(`/assign-position/create`, payload);
      const data = res?.data?.data;
      const selectedPosition = jobsList?.find(
        (job) => job?.id === data[0]?.positionId
      );
      data.forEach((val) => {
        const index = selectedPosition?.assignedPositions?.findIndex(
          (item) => item?.userId === val?.userId
        );
        if (index > 0) {
          selectedPosition?.assignedPositions?.splice(index, 1, val);
        } else {
          selectedPosition?.assignedPositions?.push(val);
        }
      });
      console.log("deSelected", deSelected);
      console.log(
        "selectedPosition?.assignedPositions",
        jobsList.assignedPositions
      );
      const activeIds = jobsList?.assignedPositions?.filter(
        (element) => !deSelected?.includes(element?.userId)
      );
      console.log(activeIds, "aaactive ids");
      jobsList.assignedPositions = activeIds;
    }
    setAnchorEl(null);
    setJobsList([...jobsList]);
  };
  const handleAssignMe = () => {
    handleClose(true);
  };
  const handleItemClick = (id: number) => {
    if (selected.includes(id)) {
      const filtered = selected?.filter((item) => item !== id);
      setSelected(filtered);
    } else {
      setSelected([...selected, id]);
    }
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
        <StyledAssignBtn onClick={handleAssignMe}>Assign to me</StyledAssignBtn>
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

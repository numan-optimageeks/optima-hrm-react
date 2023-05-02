import { useState } from "react";
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

interface IAssignPosition {
  hrList: IUser[];
}

const AssignPosition: React.FC<IAssignPosition> = ({ hrList }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "200px",
          },
        }}
      >
        <StyledAssignBtn onClick={() => {}}>Assign to me</StyledAssignBtn>
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

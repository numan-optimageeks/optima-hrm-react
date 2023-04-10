import React from "react";
import MenuSlot from "../menuSlot/MenuSlot";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FoundationIcon from "@mui/icons-material/Foundation";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SettingsIcon from "@mui/icons-material/Settings";
import { StyledList } from "./menu.style";

const Menu = () => {
  const theme = useTheme();

  const iconColor = { color: theme.colors.alpha.trueWhite[70] };
  return (
    <>
      <MenuSlot title="HR" icon={<BusinessCenterIcon sx={iconColor} />}>
        <StyledList aria-label="main mailbox folders">
          <ListItemButton
            selected={true}
            onClick={(event) => console.log(event, 0)}
          >
            <ListItemIcon>
              <PersonOutlineIcon sx={iconColor} />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
          <ListItemButton
            selected={false}
            onClick={(event) => console.log(event, 1)}
          >
            <ListItemIcon>
              <FoundationIcon sx={iconColor} />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </StyledList>
      </MenuSlot>
      <MenuSlot title="Recruiter" icon={<ContentPasteIcon sx={iconColor} />}>
        <></>
      </MenuSlot>
      <MenuSlot title="Settings" icon={<SettingsIcon sx={iconColor} />}>
        <></>
      </MenuSlot>
    </>
  );
};
export default Menu;

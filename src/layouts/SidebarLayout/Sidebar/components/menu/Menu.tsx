import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PortraitIcon from '@mui/icons-material/Portrait';
import SettingsIcon from "@mui/icons-material/Settings";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuSlot from "../menuSlot/MenuSlot";
import { StyledList } from "./menu.style";
import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Menu = () => {
  const navigate = useNavigate()
  const theme = useTheme();
  const iconColor = { color: theme.colors.alpha.trueWhite[70] };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <StyledList aria-label="main mailbox folders">
        <ListItemButton
          onClick={() => { navigate('/dashboard'), handleListItemClick(6) }}
          selected={selectedIndex === 6 ? true : false}
        >
          <ListItemIcon>
            <DashboardIcon sx={iconColor} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </StyledList>
      <MenuSlot title="HR" icon={<BusinessCenterIcon sx={iconColor} />}>
        <StyledList aria-label="main mailbox folders" sx={{ backgroundColor: '#2c406e' }}>
          <ListItemButton
            onClick={() => { navigate('/employees'), handleListItemClick(0) }}
            selected={selectedIndex === 0 ? true : false}
          >
            <ListItemIcon>
              <PersonOutlineIcon sx={iconColor} />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
          <ListItemButton
            onClick={() => { navigate('/departments'), handleListItemClick(1) }}
            selected={selectedIndex === 1 ? true : false}
          >
            <ListItemIcon>
              <HomeIcon sx={iconColor} />
            </ListItemIcon>
            <ListItemText primary="Departments" />
          </ListItemButton>
          <ListItemButton
            onClick={() => { navigate('/designations'), handleListItemClick(2) }}
            selected={selectedIndex === 2 ? true : false}
          >
            <ListItemIcon>
              <PortraitIcon sx={iconColor} />
            </ListItemIcon>
            <ListItemText primary="Designations" />
          </ListItemButton>
        </StyledList>
      </MenuSlot>
      <MenuSlot title="Recruiter" icon={<ContentPasteIcon sx={iconColor} />}>
        <StyledList aria-label="main mailbox folders" sx={{ backgroundColor: '#2c406e' }}>
          <ListItemButton
            onClick={() => { navigate('/applicants'), handleListItemClick(3) }}
            selected={selectedIndex === 3 ? true : false}
          >
            <ListItemIcon>
              <GroupsIcon sx={iconColor} />
            </ListItemIcon>
            <ListItemText primary="Applicants" />
          </ListItemButton>
          <ListItemButton
            onClick={() => { navigate('/interviews'), handleListItemClick(4) }}
            selected={selectedIndex === 4 ? true : false}
          >
            <ListItemIcon>
              <CalendarMonthIcon sx={iconColor} />
            </ListItemIcon>
            <ListItemText primary="Interviews" />
          </ListItemButton>
        </StyledList>
      </MenuSlot>
      <MenuSlot title="Settings" icon={<SettingsIcon sx={iconColor} />}>
        <StyledList aria-label="main mailbox folders" sx={{ backgroundColor: '#2c406e' }}>
          <ListItemButton
            onClick={() => { navigate('/users'), handleListItemClick(5) }}
            selected={selectedIndex === 5 ? true : false}
          >
            <ListItemIcon>
              <GroupsIcon sx={iconColor} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </StyledList>
      </MenuSlot>
    </>
  );
};
export default Menu;

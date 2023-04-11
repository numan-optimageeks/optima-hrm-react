import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PortraitIcon from "@mui/icons-material/Portrait";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const SideBarData = (iconColor) => {
  return [
    {
      title: "Dashboard",
      icon: <DashboardIcon sx={iconColor} />,
    },
    {
      title: "HR",
      icon: <BusinessCenterIcon sx={iconColor} />,
      menu: [
        {
          path: "/employees",
          title: "Employees",
          icon: <PersonOutlineIcon sx={iconColor} />,
        },
        {
          path: "/departments",
          title: "Departments",
          icon: <HomeIcon sx={iconColor} />,
        },
        {
          path: "/designations",
          title: "Designations",
          icon: <PortraitIcon sx={iconColor} />,
        },
      ],
    },
    {
      title: "Recruiter",
      icon: <ContentPasteIcon sx={iconColor} />,
      menu: [
        {
          path: "/applicants",
          title: "Applicants",
          icon: <GroupsIcon sx={iconColor} />,
        },
        {
          path: "/interviews",
          title: "Interviews",
          icon: <CalendarMonthIcon sx={iconColor} />,
        },
      ],
    },
    {
      title: "Settings",
      icon: <SettingsIcon sx={iconColor} />,
      menu: [
        {
          path: "/users",
          title: "Users",
          icon: <GroupsIcon sx={iconColor} />,
        },
      ],
    },
  ];
};

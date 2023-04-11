import React from "react";
import { useLocation, useNavigate } from "react-router";
import MenuSlot from "../menuSlot/MenuSlot";
import { StyledList } from "../menu/menu.style";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const MenuItem = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <MenuSlot title={data?.title} icon={data?.icon}>
      <StyledList
        aria-label="main mailbox folders"
        sx={{ backgroundColor: "#2c406e" }}
      >
        {data?.menu?.map((item, index) => {
          return (
            <ListItemButton
              key={item?.title + index}
              onClick={() => navigate(item?.path)}
              selected={location?.pathname === item?.path}
            >
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText primary={item?.title} />
            </ListItemButton>
          );
        })}
      </StyledList>
    </MenuSlot>
  );
};
export default MenuItem;

import { styled, MenuItem, Menu } from "@mui/material";

export const StyledAssignBtn = styled(MenuItem)(
  ({ theme }) => `
      color:${theme.colors.primary.main} !important;
      `
);

export const StyledMenu = styled(Menu)(
  ({ theme }) => `
  .MuiList-padding{
      padding-left:0px !important;
      padding-right:0px !important;
    }
        `
);

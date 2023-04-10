import { List, darken, styled } from "@mui/material";

export const StyledList = styled(List)(
  ({ theme }) => `
  padding:0px !important;

  .MuiListItemIcon-root{
    min-width:auto !important;
  }
  svg{
    margin-right:10px;
}
  `
);

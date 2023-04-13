import { Container, Box, Typography, styled } from "@mui/material";

export const StyledRoot = styled(Container)(
  ({ theme }) => `
  padding:20px;
  min-height:calc(100vh - 180px);
  `
);
export const StyledContainer = styled(Box)(
  ({ theme }) => `
   background-color: ${theme.colors.alpha.trueWhite[70]};
   border: 1px solid #d8dbe0;
   border-radius: 8px;
   box-shadow: 0px 0px 11px 3px rgba(132, 132, 133, 0.15);
   -webkit-box-shadow: 0px 0px 11px 3px rgba(132, 132, 133, 0.15);
   -moz-box-shadow: 0px 0px 11px 3px rgba(132, 132, 133, 0.15);
    `
);
export const StyledLabel = styled(Typography)(
  ({ theme }) => `
    padding: 15px;
    background-color: ${theme.colors.alpha.black[10]};
    border-top-right-radius:8px;
    border-top-left-radius:8px;
    border-bottom: 1px solid #d8dbe0;
      `
);
export const StyledBody = styled(Box)(
  ({ theme }) => `
      padding: 15px;
      display:flex;
      flex-direction:column;
        `
);

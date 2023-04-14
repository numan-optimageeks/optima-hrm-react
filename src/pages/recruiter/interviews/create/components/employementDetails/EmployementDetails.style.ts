import { Box, styled, Typography } from "@mui/material";

export const StyledLabel = styled(Typography)(
  ({ theme }) => `
      padding: 15px;
      background-color: ${theme.colors.alpha.black[10]};
      border-bottom: 1px solid #d8dbe0;  
        margin: 0px -15px;
        margin-bottom:20px;
        `
);

export const StyledForm = styled(Box)(
  ({ theme }) => `
  display:flex;
  width:100%;
  margin-bottom:20px;
  justify-content:space-between;
  align-items:flex-start;
  
  `
);
export const StyledInput = styled(Box)(
  ({ theme }) => `
    width:49%;
    `
);

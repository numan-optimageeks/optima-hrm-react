import { Box, styled } from "@mui/material";

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

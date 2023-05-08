import { Box, styled } from "@mui/material";

export const StyledForm = styled(Box)(
  ({ theme }) => `
  display:flex;
  width:100%;
  margin-bottom:20px;
  justify-content:space-between;
  align-items:flex-start;
  @media only screen and (max-width: 768px) {
    flex-direction:column;
    margin-bottom:0px;

  }
  
  `
);
export const StyledInput = styled(Box)(
  ({ theme }) => `
    width:49%;
    @media only screen and (max-width: 768px) {
      width:100%;
      margin-bottom:20px;
    }
    `
);
export const StyledFullInput = styled(Box)(
  ({ theme }) => `
  width:100%;
    @media only screen and (max-width: 768px) {
      margin-bottom:20px;
    }
    `
);

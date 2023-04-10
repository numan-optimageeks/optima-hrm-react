import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  .logo{
    object-fit: contain;
  margin-bottom: 20px;
  }
  `
);

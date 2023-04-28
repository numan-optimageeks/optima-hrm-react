import { Container, Box, Typography, styled } from "@mui/material";

export const StyledBody = styled(Box)(
  ({ theme }) => `
      padding: 15px;
      display:flex;
      width:100%;
      flex-direction:column;
        `
);
export const DetailSection = styled(Box)(
  ({ theme }) => `
        display:flex;
        width:100%;
        margin-bottom:10px;
          `
);

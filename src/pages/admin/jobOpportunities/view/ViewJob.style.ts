import { Container, Box, Typography, styled } from "@mui/material";

export const StyledBody = styled(Box)(
  ({ theme }) => `
      padding: 20px;
      display:flex;
      flex-wrap:wrap;
      width:100%;
      @media only screen and (max-width: 768px) {
        flex-direction:column;
      }
        `
);
export const DetailSection = styled(Box)(
  ({ theme }) => `
        display:flex;
        width:49%;
        margin-bottom:20px;
        @media only screen and (max-width: 768px) {
            width:100%;
          }
          `
);

import { Box, Typography, styled } from "@mui/material";

export const StyledBox = styled(Box)(
  ({ theme }) => `
  background-color: ${theme.colors.alpha.trueWhite[70]};;
  padding: 24px;
  width: 600px;
  border: 1px solid #d8dbe0;
  border-radius: 8px;
  box-shadow: 0px 0px 11px 3px rgba(132, 132, 133, 0.15);
  -webkit-box-shadow: 0px 0px 11px 3px rgba(132, 132, 133, 0.15);
  -moz-box-shadow: 0px 0px 11px 3px rgba(132, 132, 133, 0.15);
  @media only screen and (max-width: 650px) {
    width: 95%;
  }
  }
  `
);
export const StyledLabel = styled(Typography)(
  ({ theme }) => `
    text-align: center !important;
    `
);
export const StyledTagline = styled(Typography)(
  ({ theme }) => `
    color: ${theme.colors.alpha.black[70]};
    margin: 20px 0px !important;
      `
);

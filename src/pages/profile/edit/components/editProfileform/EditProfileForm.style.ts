import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)(
  ({ theme }) => `
display:flex;
width:100%;
justify-content:space-between;
@media only screen and (max-width: 650px) {
    flex-direction:column;
  }
`
);

export const StyledSection = styled(Box)(
  ({ theme }) => `
display:flex;
width:49%;
@media only screen and (max-width: 650px) {
    margin-bottom:20px;
    width:100%;
    justify-content:center;
    }
`
);
export const StyledInfoSection = styled(Box)(
  ({ theme }) => `
  display:flex;
  flex-direction:column;
  width:49%;
  @media only screen and (max-width: 650px) {
    width:100%;
  }`
);

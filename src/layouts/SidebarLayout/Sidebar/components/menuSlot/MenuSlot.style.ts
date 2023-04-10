import { Accordion, darken, styled } from "@mui/material";

export const StyledAccordion = styled(Accordion)(
  ({ theme }) => `
  border-bottom-left-radius:0px !important;
  border-bottom-right-radius:0px !important;
  background-color: ${darken(theme.colors.alpha.black[100], 0.5)}  !important;
  color: ${theme.colors.alpha.trueWhite[70]};
       
  .MuiAccordionSummary-content{
    align-items:center !important;
    svg{
        margin-right:10px;
    }
  }
  .MuiAccordionDetails-root{
    padding:0px !important;
  }
  `
);

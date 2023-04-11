import { Accordion, darken, styled } from "@mui/material";

export const StyledAccordion = styled(Accordion)(
  ({ theme }) => `
  border-bottom-left-radius:0px !important;
  border-bottom-right-radius:0px !important;
  background-color: #27385b;
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
  .MuiListItemButton-root{
    :hover{
      background-color: #3b558a;
    }
  }
  `
);

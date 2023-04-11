import React from "react";
import {
  AccordionDetails,
  AccordionSummary,
  Typography, useTheme
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledAccordion } from "./MenuSlot.style";

interface IMenuSlot {
  title: string;
  children: React.ReactNode;
  icon: React.ReactElement;
}

const MenuSlot: React.FC<IMenuSlot> = ({ title, icon, children }) => {
  const theme = useTheme();
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ color: theme.colors.alpha.trueWhite[70] }} />
        }
        aria-controls="panel1a-content"
        id={`panel1a-header+${title || ""}`}
      >
        {icon}
        <Typography>{title || ""}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};
export default MenuSlot;

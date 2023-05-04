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

export const AssigneSection = styled(Box)(
  ({ theme }) => `
        display:flex;
        flex-direction:column;
        width:100%;
        margin-bottom:20px;
        `
);
interface IStyledStatus {
  value: string;
}
export const StyledStatus = styled(Typography)<IStyledStatus>(
  ({ theme, value }) => {
    const getColor = () => {
      switch (value) {
        case "open":
          return theme.colors.primary.main;
        case "hold":
          return theme.colors.warning.main;
        default:
          return theme.colors.error.main;
      }
    };
    return `text-transform: capitalize;
           font-weight: bold;
           color: ${getColor()};
           `;
  }
);

export const AssigneItem = styled(Typography)(
  ({ theme }) => `
       color:${theme.colors?.primary?.main} !important;
       font-weight:500 !important;
      `
);

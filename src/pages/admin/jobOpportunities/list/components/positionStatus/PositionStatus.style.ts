import { styled, Dialog, Stack } from "@mui/material";

interface IStyledStatus {
  value: string;
}

export const StyledStatus = styled(Stack)<IStyledStatus>(({ theme, value }) => {
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
            cursor:pointer;
    `;
});

export const StyledDialog = styled(Dialog)(
  ({ theme }) => `
  .MuiPaper-root{
      width:250px !important;
      margin:0px !important;
    }
    `
);

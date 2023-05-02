import { styled, Box, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface IStyledBox {
  rows: number;
}
export const StyledBox = styled(Box)<IStyledBox>(
  ({ theme, rows }) => `
    width:100%;
    height:calc(${rows} * 52.5px + 109px )

    `
);

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
  `;
});

export const StyledTable = styled(DataGrid)(
  ({ theme }) => `
  .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus{
    outline:none !important;
  }
  .MuiDataGrid-columnHeaderTitleContainerContent{
   user-select:none !important;
   .MuiDataGrid-columnHeaderTitle{

       font-weight: 600 !important;
    }
  }
  `
);

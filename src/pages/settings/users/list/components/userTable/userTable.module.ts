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

export const StyledRole = styled(Stack)(
  ({ theme }) => `
  text-transform:uppercase !important;
  font-weight: 600 !important;
  color:${theme.palette.primary.main} !important;
 
  `
);

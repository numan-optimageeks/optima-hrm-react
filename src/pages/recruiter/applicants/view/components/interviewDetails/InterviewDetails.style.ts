import { Box, styled, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledHeader = styled(Typography)(
  ({ theme }) => `
      padding: 15px;
      background-color: ${theme.colors.alpha.black[10]};
      border-bottom: 1px solid #d8dbe0;
        `
);
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

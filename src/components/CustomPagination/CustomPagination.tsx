import {
  Box,
  Pagination,
  PaginationItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  gridPageSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const pageCount = Math.ceil(rowCount / pageSize);

  return (
    <Pagination
      color="primary"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
      //   sx={{
      //     "& .MuiPaginationItem-root": {
      //       color: colors.mediumDarkGray,
      //       "&.Mui-selected": {
      //         background: "transparent",
      //         color: colors.lightRed,
      //       },
      //       "&.Mui-selected:hover": {
      //         background: "transparent",
      //       },
      //     },
      //   }}
    />
  );
}
export default CustomPagination;

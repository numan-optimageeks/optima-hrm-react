import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      onClick={() => {}}
    >
      <CircularProgress size={64} disableShrink thickness={3} />
    </Backdrop>
  );
};
export default Loader;

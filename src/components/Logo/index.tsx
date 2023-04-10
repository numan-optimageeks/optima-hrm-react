import { Box } from "@mui/material";
import logo from "src/assests/images/optima-logo.png";

function Logo() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <img src={logo} alt={"Optima Geeks"} />
    </Box>
  );
}

export default Logo;

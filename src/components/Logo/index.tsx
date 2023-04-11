import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import logo from "src/assests/images/optima-logo.png";

function Logo() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ textAlign: "center", cursor: "pointer" }}
      onClick={() => navigate("/dashboard")}
    >
      <img src={logo} alt={"Optima Geeks"} />
    </Box>
  );
}

export default Logo;

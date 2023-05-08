import { Typography, Avatar, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import defaultImage from "src/assests/images/default-profile.png";

function PageHeader() {
  const { user } = useSelector((state: RootState) => state.auth);

  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8),
          }}
          variant="rounded"
          alt={user?.full_name || ""}
          src={
            user?.image
              ? `${process.env.REACT_APP_MAILING_BACKEND}/${user?.image}`
              : defaultImage
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome,{" "}
          <span style={{ textTransform: "capitalize" }}>
            {user?.full_name || ""}
          </span>
          !
        </Typography>
        <Typography variant="subtitle2">Let the Adventure Begin!</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;

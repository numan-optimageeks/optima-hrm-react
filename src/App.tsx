import { useRoutes } from "react-router-dom";
import router from "src/router";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { useDispatch } from "react-redux";
import LocalStorage from "./services/localStorage";
import { useEffect } from "react";
import { loginUser } from "./store/features/Auth";
import { TOKEN, USER } from "./constants/constants";

function App() {
  const content = useRoutes(router);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = LocalStorage.GetItem(TOKEN) || "";
    const user = JSON.parse(LocalStorage.GetItem(USER) || "");
    dispatch(loginUser({ user: user, token: token }));
  }, []);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;

import { useRoutes } from "react-router-dom";
import router from "src/router";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import LocalStorage from "./services/localStorage";
import { TOKEN, USER } from "./constants/constants";
import { loginUser } from "./store/features/Auth";

function App() {
  const content = useRoutes(router);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateData = async () => {
      const token = (await LocalStorage.GetItem(TOKEN)) || "";
      const user = JSON.parse(LocalStorage.GetItem(USER) || "");
      dispatch(loginUser({ user: user, token: token }));
    };
    updateData();
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

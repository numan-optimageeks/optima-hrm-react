import { Helmet } from "react-helmet-async";
import PageHeader from "./components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";
import { useEffect } from "react";
import { RootState } from "src/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LOGIN } from "src/constants/routeConstants";
import LocalStorage from "src/services/localStorage";
import { TOKEN } from "src/constants/constants";

const Dashoard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await LocalStorage.GetItem(TOKEN);
      if (!token) navigate(LOGIN);
    };
    checkAuth();
  }, [user?.id]);

  return (
    <>
      <Helmet>
        <title>Optima Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">Something here ...........</Container>
      <Footer />
    </>
  );
};

export default Dashoard;

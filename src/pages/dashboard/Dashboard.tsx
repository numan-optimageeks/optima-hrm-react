import { Helmet } from "react-helmet-async";
import PageHeader from "./components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";
import { useEffect } from "react";
import { RootState } from "src/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Dashoard = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

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

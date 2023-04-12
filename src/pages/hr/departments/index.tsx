import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";
import { useNavigate } from "react-router";

function Departments() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet title="Departments" />

      <Container maxWidth="lg" onClick={() => navigate("/departments/create")}>
        Departments
      </Container>
      <Footer />
    </>
  );
}

export default Departments;

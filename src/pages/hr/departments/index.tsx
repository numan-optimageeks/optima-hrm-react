import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";

function Departments() {
  return (
    <>
      <Helmet>
        <title>Optima-Departments</title>
      </Helmet>

      <Container maxWidth="lg">Departments</Container>
      <Footer />
    </>
  );
}

export default Departments;

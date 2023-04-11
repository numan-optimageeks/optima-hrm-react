import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";

function Designations() {
  return (
    <>
      <Helmet>
        <title>Optima-Designations</title>
      </Helmet>

      <Container maxWidth="lg">Designations</Container>
      <Footer />
    </>
  );
}

export default Designations;

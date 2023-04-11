import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";

function Applicants() {
  return (
    <>
      <Helmet>
        <title>Optima-Applicants</title>
      </Helmet>

      <Container maxWidth="lg">Applicants</Container>
      <Footer />
    </>
  );
}

export default Applicants;

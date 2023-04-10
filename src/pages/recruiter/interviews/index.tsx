import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";

function Interviews() {
  return (
    <>
      <Helmet>
        <title>Optima-Interviews</title>
      </Helmet>

      <Container maxWidth="lg">Interviews</Container>
      <Footer />
    </>
  );
}

export default Interviews;

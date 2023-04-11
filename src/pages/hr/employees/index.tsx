import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";

function Employees() {
  return (
    <>
      <Helmet>
        <title>Optima-Employees</title>
      </Helmet>

      <Container maxWidth="lg">abc</Container>
      <Footer />
    </>
  );
}

export default Employees;

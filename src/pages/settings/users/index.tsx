import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";

function Users() {
  return (
    <>
      <Helmet>
        <title>Optima-Users</title>
      </Helmet>

      <Container maxWidth="lg">Users</Container>
      <Footer />
    </>
  );
}

export default Users;

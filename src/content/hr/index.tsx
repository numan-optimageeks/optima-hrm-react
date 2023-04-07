import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';


function HrPage() {
  return (
    <>
      <Helmet>
        <title>Optima-HR</title>
      </Helmet>

      <Container maxWidth="lg">
        abc
      </Container>
      <Footer />
    </>
  );
}

export default HrPage;
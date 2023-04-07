import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';


function OptimaRecruiter() {
    return (
        <>
            <Helmet>
                <title>Optima-Recruiter</title>
            </Helmet>

            <Container maxWidth="lg">
                Recruiter
            </Container>
            <Footer />
        </>
    );
}

export default OptimaRecruiter;
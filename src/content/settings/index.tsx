import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';


function OptimaPortalSettings() {
    return (
        <>
            <Helmet>
                <title>Optima Portal-Settings</title>
            </Helmet>

            <Container maxWidth="lg">
                Settings
            </Container>
            <Footer />
        </>
    );
}

export default OptimaPortalSettings;
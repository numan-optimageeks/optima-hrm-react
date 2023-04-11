import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";
import EnhancedTable from "./EmployeeTable";
import { Box } from "@mui/material";

function Employees() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', backgroundColor: 'red' }}>
      <Helmet>
        <title>Optima-Employees</title>
      </Helmet>

      <Container maxWidth="lg" >
        <EnhancedTable />
      </Container>
      <Footer />
    </Box>
  );
}

export default Employees;

import Router from './Router';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
function App() {
  return (
    <Container maxWidth='sm'>
      <Box textAlign='center' mt={5}>
        <Router />
      </Box>
    </Container>
  );
}

export default App;

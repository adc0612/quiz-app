import Router from './Router';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { RecoilRoot } from 'recoil';
function App() {
  return (
    <RecoilRoot>
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={5}>
          <Router />
        </Box>
      </Container>
    </RecoilRoot>
  );
}

export default App;

import React from 'react';
import DropDown from '../components/form/DropDown';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TextInput from '../components/form/TextInput';

const Home = () => {
  return (
    <div>
      <Typography variant='h2' fontWeight='bold'>
        퀴즈 풀기
      </Typography>
      <form>
        <DropDown label='카테고리' />
        <DropDown label='난이도' />
        <DropDown label='문항 유형' />
        <TextInput label='문항 갯수' />
        <Box mt={3} width='100%'>
          <Button variant='contained' color='primary' type='submit' fullWidth>
            퀴즈 시작
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Home;

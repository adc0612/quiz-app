import { Typography } from '@mui/material';
import React from 'react';

const ErrorPage = ({ message }) => {
  return (
    <div>
      <Typography variant='h5' mt={20} color='red'>
        오류가 발생 했습니다. 오류: {message}
      </Typography>
    </div>
  );
};

export default ErrorPage;

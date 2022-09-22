import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <Box mt={20}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;

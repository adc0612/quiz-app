import React from 'react';
import { Box } from '@mui/system';
import { FormControl, TextField } from '@mui/material';

const TextInput = ({ label }) => {
  const handleChange = () => {};

  return (
    <Box mt={3}>
      <FormControl fullWidth>
        <TextField onChange={handleChange} variant='outlined' label={label} type='number' size='small' />
      </FormControl>
    </Box>
  );
};

export default TextInput;

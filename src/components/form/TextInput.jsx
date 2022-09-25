import React from 'react';
import { Box } from '@mui/system';
import { FormControl, TextField } from '@mui/material';

const TextInput = ({ label, value, setValue, name }) => {
  const handleChange = (e) => {
    setValue(e.target.value, name);
  };

  return (
    <Box mt={3}>
      <FormControl fullWidth>
        <TextField value={value} onChange={handleChange} variant='outlined' label={label} type='number' size='small' />
      </FormControl>
    </Box>
  );
};

export default TextInput;

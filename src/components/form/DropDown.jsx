import React from 'react';
import { Box } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const DropDown = ({ label }) => {
  const [value, setValue] = useState('');
  const handleChange = () => {};
  return (
    <Box mt={3}>
      <FormControl fullWidth size='small'>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          <MenuItem>Option1</MenuItem>
          <MenuItem>Option1</MenuItem>
          <MenuItem>Option1</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;

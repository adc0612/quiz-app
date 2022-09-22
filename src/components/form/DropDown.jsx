import React from 'react';
import { Box } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const DropDown = ({ options, label, value, setValue, name }) => {
  const handleChange = (e) => {
    setValue(e.target.value, name);
  };
  return (
    <Box mt={3}>
      <FormControl fullWidth size='small'>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;

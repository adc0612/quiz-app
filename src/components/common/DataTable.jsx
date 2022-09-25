import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DataTable = ({ label, headers, data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label={label}>
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell align='center' key={i}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='center'>{i + 1}</TableCell>
              <TableCell align='center'>{row.totalCount}</TableCell>
              <TableCell align='center'>{row.answerCount}</TableCell>
              <TableCell align='center'>{row.wrongCount}</TableCell>
              <TableCell align='center'>{row.elapsedTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

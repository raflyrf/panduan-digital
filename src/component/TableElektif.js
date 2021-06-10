import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import DATADUMMY from './dataDummyTertarikElektif';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
  tableContainer: {
    maxWidth: 600,
  },
});

export default function BasicTable({ dataTertarik, idMataKuliah }) {
    const classes = useStyles();
    
    // filter dimana id matkulnya  
    const filterData = dataTertarik.filter(item => item.id_mata_kuliah === idMataKuliah)

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>NIM</TableCell>
                <TableCell align="left">Nama</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {filterData.map((item) => (
                <TableRow key={item.id} hover>
                <TableCell component="th" scope="row">
                    {item.nim}
                </TableCell>
                <TableCell align="left">{item.username}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
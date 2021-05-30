import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tableContainer: {
      maxWidth: 850
  }
});

export default function BasicTable({ dataToShow, type }) {
    const classes = useStyles();
    console.log("TABLE DATA ")
    console.log(dataToShow)


    const sortedBySemesterData = [].concat(dataToShow)
    .sort((a, b) => a.semester > b.semester ? 1 : -1)
    
    console.log(sortedBySemesterData)

    const filterMataKuliahType = sortedBySemesterData.filter(item => item.jenis === type)
    
    return (
        <TableContainer component={Paper} className={classes.tableContainer} >
        <Table className={classes.table} size="small" aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="left">Kode MK</TableCell>
                <TableCell align="left">Nama MK</TableCell>
                <TableCell align="left">Semester</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {filterMataKuliahType.map((item) => (
                <TableRow key={item.id} hover>
                    <TableCell component="th" scope="row">
                        {item.id}
                    </TableCell>
                    <TableCell align="left">{item.kodeMK}</TableCell>
                    
                    <TableCell align="left"><Link to={`/matakuliah/${item.id}`}>{item.namaMK}</Link></TableCell>
                    
                    <TableCell align="left">{item.semester}</TableCell>
                    </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tableContainer: {
      maxWidth: 850
  }
});

export default function BasicTable({ dataToShow, type, kode }) {
    const classes = useStyles();
    
    function getUnique(arr, comp) {

                // store the comparison  values in array
        const unique =  arr.map(e => e[comp])

            // store the indexes of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the false indexes & return unique objects
            .filter((e) => arr[e]).map(e => arr[e]);

        return unique;
    }

    const uniqueData = getUnique(dataToShow, "MataKuliahId")

    const sortedBySemesterData = [].concat(uniqueData)
    .sort((a, b) => a.Kode > b.Kode ? 1 : -1)
    
    console.log(sortedBySemesterData)

    // const filterMataKuliahType = sortedBySemesterData.filter(item => item.jenis === type)
    const [showType, setShowType] = useState([])
    
    const getData = async () => {
        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/list-mk-elektif',
            headers: { 
              'Content-Type': 'application/json'
            }
          };
          
          await axios(config)
          .then(function (response) {
            // console.log(response.data);
            setShowType(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    useEffect(()=>{
        getData();
    }, [])
    
    // console.log(showType);
    const filterMataKuliahElektif = showType.filter(item => item.Kode.substring(0,3) === kode)
    console.log(filterMataKuliahElektif)
    
    var show = []
    
    if (type === "Elektif"){
        show = sortedBySemesterData.filter(({MataKuliahId: id1}) => filterMataKuliahElektif.some(({MataKuliahId:id2}) => id2 === id1))
        console.log(show);
    } else if (type === "Mayor"){
        show = sortedBySemesterData.filter(({MataKuliahId: id1}) => !filterMataKuliahElektif.some(({MataKuliahId:id2}) => id2 === id1))
    }

    
    return (
        <TableContainer component={Paper} className={classes.tableContainer} >
        <Table className={classes.table} size="small" aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="left">Kode MK</TableCell>
                <TableCell align="left">Nama MK</TableCell>
                <TableCell align="left">SKS</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {show.map((item) => (
                <TableRow key={item.MataKuliahId} hover>
                    <TableCell component="th" scope="row">
                        {item.MataKuliahId}
                    </TableCell>
                    <TableCell align="left">{item.Kode}</TableCell>
                    
                    <TableCell align="left"><Link to={{pathname:`/matakuliah/${item.MataKuliahId}`, 
                                                    state:{
                                                        type:type
                                                    }}}>{item.Nama}</Link></TableCell>
                    
                    <TableCell align="left">{item.Sks}({item.SksKuliah}-{item.SksPraktikum})</TableCell>
                    </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

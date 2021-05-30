import { FormControl, Select, MenuItem, InputLabel, makeStyles, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import DATA from './dataDummy.js'
import DATAMK from './dataDummyMataKuliah.js'
import Table from './Table.js'
// const DATA = [
//     {
//       id: 1,
//       value: 10,
//       label: 'Ten',
//       fakultas: 'Pertanian',
//       kodeDepartemen: 'A1',
//       namaDepartemen: 'MANAJEMEN SUMBERDAYA LAHAN'
//     },
//     {
//         id: 2,
//       value: 20,
//       label: 'Twentyaaaaaaaaaaaaaaaaaaaaaaaa',
//       fakultas: 'Pertanian',
//       kodeDepartemen: 'A2',
//       namaDepartemen: 'AGRONOMI DAN HORTIKULTURA'
//     },{
//         id: 3,
//       value: 30,
//       label: 'Thirty',
//       fakultas: 'Pertanian',
//       kodeDepartemen: 'A3',
//       namaDepartemen: 'PROTEKSI TANAMAN'
//     },{
//         id: 4,
//       value: 40,
//       label: 'Thirty',
//       fakultas: 'Pertanian',
//       kodeDepartemen: 'A4',
//       namaDepartemen: 'ARSITEKTUR LANSKAP'
//     },{
//         id: 5,
//       value: 50,
//       label: 'Thirty',
//       fakultas: 'Kedokteran Hewan',
//       kodeDepartemen: 'B0',
//       namaDepartemen: 'PROTEKSI TANAMAN'
//     },{
//         id: 6,
//       value: 60,
//       label: 'Thirty',
//       fakultas: 'Perikanan',
//       kodeDepartemen: 'C1',
//       namaDepartemen: 'TEKNOLOGI & MANAJEMEN PERIKANAN BUDIDAYA'
//     },{
//         id: 7,
//       value: 70,
//       label: 'Thirty',
//       fakultas: 'Pertanian',
//       kodeDepartemen: 'C2',
//       namaDepartemen: 'MANAJEMEN SUMBERDAYA PERAIRAN'
//     },{
//         id: 8,
//       value: 80,
//       label: 'Thirty',
//       fakultas: 'Peternakan',
//       kodeDepartemen: 'D1',
//       namaDepartemen: 'TEKNOLOGI PRODUKSI TERNAK'
//     },{
//         id: 9,
//       value: 90,
//       label: 'Thirty',
//       fakultas: 'Peternakan',
//       kodeDepartemen: 'D2',
//       namaDepartemen: 'NUTRISI DAN TEKNOLOGI PAKAN'
//     },{
//         id: 10,
//       value: 100,
//       label: 'Thirty',
//       fakultas: 'Matematika dan Ilmu Pengetahuan Alam',
//       kodeDepartemen: 'G1',
//       namaDepartemen: 'STATISTIKA DAN SAINS DATA'
//     },{
//         id: 11,
//       value: 110,
//       label: 'Thirty',
//       fakultas: 'Matematika dan Ilmu Pengetahuan Alam',
//       kodeDepartemen: 'G6',
//       namaDepartemen: 'ILMU KOMPUTER'
//     },
// ]



const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2)
    },
    text: {
        marginLeft: 5
    },
    show: {
        flexDirection: "column",
    },
    upper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    divider: {
        marginTop: 60
    },
    tableContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));


const Dropdown = () => {
    const classes = useStyles();

    const [dataDepartemen, setDataDepartemen] = useState("");
    const [selectedSubject, setSelectedSubject] = useState([])
    const handleChange = (e) => {
        setDataDepartemen(e.target.value);        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dataDepartemen)

        // Pas submit nanti hanya memfilter DATAMK dengan
        // nama departemen yang sama dgn yang disubmit
        const selected = DATAMK.filter(item => item.departemen.toLowerCase() === dataDepartemen.namaDepartemen.toLowerCase())
        
        setSelectedSubject(selected)
    }

    return(
        <React.Fragment>
            <div className={classes.upper}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Departemen</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dataDepartemen}
                        onChange={handleChange}
                        >
                            {DATA.map(it => (
                                <MenuItem value={it} key={it.id} >{it.kodeDepartemen} - {it.namaDepartemen}</MenuItem>)
                            )}
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit} className={classes.button}>
                    <SearchIcon />
                        <Typography className={classes.text}>
                            Cari
                        </Typography>
                </Button>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.show}>
                <Typography>Mayor</Typography>
                <div className={classes.tableContainer}>
                    <Table dataToShow={selectedSubject} type="Mayor" />
                </div>
                <Typography>Elektif</Typography>
                <div className={classes.tableContainer}>
                    <Table dataToShow={selectedSubject} type="Elektif" />
                </div>
                
            </div>
        </React.Fragment>
    );
}

export default Dropdown;
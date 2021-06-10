import { FormControl, Select, MenuItem, InputLabel, makeStyles, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import DATA from './dataDummy.js'
import Table from './Table.js'
import axios from 'axios';

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

var DATE = new Date();
var YEAR = DATE.getFullYear();

const Dropdown = () => {
    const classes = useStyles();

    const [dataDepartemen, setDataDepartemen] = useState("");
    const [selectedSubject, setSelectedSubject] = useState([])
    const [kodeMK, setKodeMK] = useState("")
    
    const handleChange = (e) => {
        setDataDepartemen(e.target.value);        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dataDepartemen)

        var config = {
            method: 'get',
            url: `https://api.ipb.ac.id/v1/MataKuliah/DepartemenSaya?TahunAkademik=${YEAR-1}/${YEAR}&Semester=All&Strata=S1`,
            headers: { 
              'X-IPBAPI-TOKEN': 'Bearer 62225dc6-925a-3bb6-af6c-45e427d7514c'
            }
          };
          
          axios(config)
          .then(function (response) {
            // console.log(response.data);
            // console.log(response.data[0].Kode.substring(0,3));
            
            const selected = response.data.filter(item => item.Kode.substring(0,3).toLowerCase() === dataDepartemen.singkatanDepartemen.substring(0,3).toLowerCase())
            setSelectedSubject(selected)
            const KODE = selected[0].Kode.substring(0,3);
            setKodeMK(KODE);
        })
        .catch(function (error) {
            console.log(error);
        });
        
        
        
        // Pas submit nanti hanya memfilter DATAMK dengan
        // nama departemen yang sama dgn yang disubmit
        // const selected = DATAMK.filter(item => item.departemen.toLowerCase() === dataDepartemen.namaDepartemen.toLowerCase())
        
        // setSelectedSubject(selected)
    }
    
    console.log(kodeMK)
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
                    <Table dataToShow={selectedSubject} type="Mayor" kode={kodeMK} />
                </div>
                <Typography>Elektif</Typography>
                <div className={classes.tableContainer}>
                    <Table dataToShow={selectedSubject} type="Elektif" kode={kodeMK} />
                </div>
                
            </div>
        </React.Fragment>
    );
}

export default Dropdown;
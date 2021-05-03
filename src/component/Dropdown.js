import { FormControl, Select, MenuItem, InputLabel, makeStyles, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';

const data = [
    {
      value: 10,
      label: 'Ten'
    },
    {
      value: 20,
      label: 'Twentyaaaaaaaaaaaaaaaaaaaaaaaa'
    },{
      value: 30,
      label: 'Thirty'
    },
]

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
        flexDirection: "column"
    },
    upper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    divider: {
        marginTop: 60
    }
}));


const Dropdown = () => {
    const classes = useStyles();
    const [age, setAge] = useState('');

    const handleChange = (e) => {
        setAge(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(age);
    }

    return(
        <React.Fragment>
            <div className={classes.upper}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Departemen</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                        >
                            {data.map(it => (
                                <MenuItem value={it.value}>{it.label} dan {it.value}</MenuItem>)
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
                Tabel Mata kuliahnya disini nih
                ihihi
            </div>
        </React.Fragment>
    );
}

export default Dropdown;
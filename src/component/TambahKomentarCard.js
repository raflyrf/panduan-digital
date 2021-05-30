import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  paper: {
    display: 'flex',
    width: "100%"
  },

}));


export default function TambahKomentarCard() {
    const classes = useStyles();

    const [username, setUsername] = useState("")

    const handleSubmit = async (e) => {

    }
  
    return (
        <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TextField value={username} 
                            onChange={e => setUsername(e.target.value)} 
                            id="filled-multiline-static" 
                            label="Tulis komentar" 
                            multiline
                            rows={2}
                            variant="filled"
                            className={clsx(classes.margin, classes.textField)} 
                    />    
                    <Button onClick={handleSubmit}>Kirim</Button>
                </Paper>
        </div>
    );
}

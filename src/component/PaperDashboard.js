import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textAlign:'center',
    flexDirection:'column'
  },
  text: {
    marginTop: 10,
    marginBottom: 10
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'center',
    '& > *': {
        width: theme.spacing(40),
        height: theme.spacing(40),
    },
},
}));

export default function SimplePaper({ title, counter }) {
  const classes = useStyles();

  return (
      <Paper elevation={3} className={classes.root}>
        <Typography className={classes.text}>{title}</Typography>
        <Typography>{counter}</Typography>
      </Paper>
  );
}

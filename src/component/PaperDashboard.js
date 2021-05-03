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
}));

export default function SimplePaper({ title, counter }) {
  const classes = useStyles();

  return (
      <Paper elevation={3} className={classes.root}>
        <Typography>{title}</Typography>
        <Typography>{counter}</Typography>
      </Paper>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, GridList, GridListTile } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textAlign:'center',
    flexDirection:'column',
  },
  text: {
    marginTop: 10,
    marginBottom: 10
  }

}));

export default function PaperShow({ title, data }) {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.root}>
            <Typography className={classes.text} >{title}</Typography>
            <GridList cellHeight={60} className={classes.gridList} cols={2} >
              {data.map((item) => 
                <GridListTile cols={1} key={item.MataKuliahId}>
                    <Typography key={item.MataKuliahId}>{item.Nama}</Typography>
                </GridListTile>              
              )}
            </GridList>       
        </Paper>
  );
}

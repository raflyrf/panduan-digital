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

export default function PaperShowElektif({ title, dataElektif, dataTertarik }) {
    const classes = useStyles();

    const test = dataElektif.filter(({MataKuliahId: id1}) => dataTertarik.some(({id_mata_kuliah:id2}) => id2 === id1))
    console.log(test)

    return (
        <Paper elevation={3} className={classes.root}>
            <Typography className={classes.text} >{title}</Typography>
            <GridList cellHeight={60} className={classes.gridList} cols={2}>
              {test.map((item) => 
                <GridListTile cols={1} key={item.id}>
                    <Typography key={item.id}>{item.Nama}</Typography>
                </GridListTile>              
              )}
            </GridList>       
        </Paper>
  );
}

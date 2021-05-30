import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    // maxWidth: '70%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList({dataKomentar, idMataKuliah}) {
    const classes = useStyles();
    
    const filterData = dataKomentar.filter(item => item.id_mata_kuliah === idMataKuliah)

    return (
        <List className={classes.root}>
        {filterData.map(item => 
        <ListItem alignItems="flex-start" key={item.id_komentar}>
            <ListItemText    
            primary={`${item.username} - ${item.nim}`}
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    {item.komentar}
                </Typography>
                </React.Fragment>
            }
            />
        </ListItem>
        )}
        <Divider variant="inset" component="li" />
        </List>
    );
}

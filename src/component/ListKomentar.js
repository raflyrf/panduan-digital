import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    // maxWidth: '70%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  fab: {
    backgroundColor: theme.palette.background.paper
  }
}));

export default function AlignItemsList({dataKomentar, idMataKuliah}) {
    const classes = useStyles();

    const [edit, setEdit] = useState([])
    const [editKomentarValue, setEditKomentarValue] = useState("")
    const [open, setOpen] = useState(false);

    const filterData = dataKomentar.filter(item => item.id_mata_kuliah === idMataKuliah)
    console.log(filterData)


    const idToEdit = JSON.parse(localStorage.getItem("token")).data.MahasiswaId
    
    const handleClickOpen = (item) => {
      setOpen(true);
      // console.log(item);
      setEdit(item)
      setEditKomentarValue(item.komentar)
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleEdit = () => {
      setOpen(false);
      console.log(edit)
      console.log(editKomentarValue)

      const editKomentar = {
        id: edit.id,
        username: edit.username,
        nim: edit.nim,
        komentar: editKomentarValue,
        id_mata_kuliah: edit.id_mata_kuliah,
        id_civitas_ipb: edit.id_civitas_ipb
      }

      console.log(editKomentar)
      var config = {
        method: 'put',
        url: 'http://127.0.0.1:8000/api/repo-edit-komentar',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : editKomentar
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    

    return (
        <List className={classes.root}>
        {filterData.map(item => 
        <ListItem alignItems="flex-start" key={item.id}>
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
            { idToEdit === item.id_civitas_ipb ?  
                (<React.Fragment>
                  <IconButton onClick={() => handleClickOpen(item)} >
                    <EditIcon fontSize="small"/>
                  </IconButton>

                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth >
                  <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Ubah komentarmu di bawah..                                                                
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      multiline
                      rows={2}
                      label="Komentar"
                      type="text"
                      fullWidth
                      value={editKomentarValue}
                      onChange={e => setEditKomentarValue(e.target.value)}
                      />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleEdit} color="primary">
                      Edit
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
                
                ) : "" }
        </ListItem>
        )}
        <Divider variant="inset" component="li" />
        </List>
    );
}

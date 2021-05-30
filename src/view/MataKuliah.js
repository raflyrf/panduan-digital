import React from 'react';
import './MainView.css'
import Header from '../component/Header'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import Dropdown from '../component/Dropdown';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop:20
    },
}));

const MataKuliah = (props) => {
    const classes = useStyles();

    // const usernameFromDashboard = props.location.state.username
    const profile = JSON.parse(localStorage.getItem('token'))
    console.log(profile)

    return(
        <React.Fragment>
            <Header />
            <div className="side-nav">
                <div className={classes.root}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <Link to={{
                            pathname: "/dashboard",
                            // state: {username: usernameFromDashboard}
                        }}  
                            style={link}>

                            <ListItem button>
                                    <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                        
                        <Link to={{
                            pathname: "/matakuliah",
                            // state: {username: usernameFromDashboard}
                        }} 
                            
                            style={link}>

                            <ListItem button>
                                    <ListItemText primary="Mata Kuliah" />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </div>
            
            <div className="matakuliah-view">
                    <Typography>ini buat Breadcrumb</Typography>
                    <Typography>{profile.name}</Typography>
                    <Dropdown />
            
            </div>
            
        </React.Fragment>
    );
}

const link = {
    textDecoration: "none"
}

export default MataKuliah;
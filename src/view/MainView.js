import React from 'react';
import './MainView.css'
import Header from '../component/Header'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PaperDashboard from '../component/PaperDashboard';
import PaperShow from '../component/PaperShow';
import { Typography } from '@material-ui/core';
// import { useJwt } from "react-jwt";

const dummy = {
    jumlahElektif: 3,
    jumlahTertarik: 1,
    semester: 3
}

const matakuliah = [
    {
        id:1,
        nama: "KOM#@#sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    {
        id:2,
        nama: "KO@asassssssssssssssssssssssssssssssssssssssssssssssssssssss3"
    },
    {
        id:3,
        nama: "KOMqw@#"
    },
    {
        id:4,
        nama: "KOMqw@#"
    },
    {
        id:5,
        nama: "KOMqw@#"
    },
    {
        id:6,
        nama: "KOMqw@#"
    },
    {
        id:7,
        nama: "KOMqw@#"
    },
    {
        id:8,
        nama: "KOMqw@#"
    },
    {
        id:9,
        nama: "KOMqw@#"
    },
    {
        id:10,
        nama: "KOMqw@#"
    },
    {
        id:11,
        nama: "KOMqw@#"
    },
    {
        id:12,
        nama: "KOMqw@#"
    },
    {
        id:13,
        nama: "KOMqw@#"
    },
    {
        id:14,
        nama: "KOMqw@#"
    },
    {
        id:15,
        nama: "KOMqw@#"
    },
    {
        id:16,
        nama: "KOMqw@#"
    },
    {
        id:17,
        nama: "KOMqw@#"
    },
    {
        id:18,
        nama: "KOMqw@#"
    }
]


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop:20
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'center',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(40),
            height: theme.spacing(40),
        },
    },
    show: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'center',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(61),
            height: theme.spacing(40),
        },
    }

}));

const MainView = (props) => {
    const classes = useStyles();
    // console.log(props.location.state.username)
    // const usernameFromLogin = props.location.state.username
    // const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    // console.log(TOKEN)
    // const { decodedToken, isExpired } = useJwt(name);
    // console.log(decodedToken)
    
    // const profile = JSON.parse(localStorage.getItem('token'))
    
    return(
        <div>
            <Header />
            <div className="side-nav">
                <div className={classes.root}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <Link to={{
                            pathname: "/dashboard",
                            // state: {username: usernameFromLogin}
                        }}  
                            style={link}>

                            <ListItem button>
                                    <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                        
                        <Link to={{
                            pathname: "/matakuliah",
                            // state: {username: usernameFromLogin}
                        }} 
                            
                            style={link}>
                            
                            <ListItem button>
                                    <ListItemText primary="Mata Kuliah" />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </div>
            
            <div className="dashboard-view">
                <div className={classes.paper}>
                    <PaperDashboard title="Jumlah elektif yang tersedia" counter={dummy.jumlahElektif} />
                    <PaperDashboard title="Jumlah elektif yang tertarik untuk diikuti" counter={dummy.jumlahTertarik} />
                    <PaperDashboard title="Semester saat ini" counter={dummy.semester}/>
                </div>
                <div className={classes.show}>
                    <PaperShow title="Daftar mata kuliah elektif tersedia semester genap/ganjil" data={matakuliah}/>
                    <PaperShow title="Mata Kuliah elektif yang tertarik diikuti" data={matakuliah}/>
                </div>
                {/* <Typography>{usernameFromLogin}</Typography> */}
                {/* <Typography>{profile.name}</Typography> */}
            </div>
            
        </div>
    );
}

const link = {
    textDecoration: "none"
}

export default MainView;
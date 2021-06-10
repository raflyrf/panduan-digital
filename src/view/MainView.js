import React, { useEffect, useState } from 'react';
import './MainView.css'
import Header from '../component/Header'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PaperDashboard from '../component/PaperDashboard';
import PaperShow from '../component/PaperShow';
import PaperShowElektif from '../component/PaperShowElektif';
import axios from 'axios';
// import { Typography } from '@material-ui/core';
// import { useJwt } from "react-jwt";


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
    // const [jumlahElektifTersedia, setJumlahElektifTersedia] = useState(0);
    const [dataTertarik, setDataTertarik] = useState([]);
    const [dataElektif, setDataElektif] = useState([]);

    const getData = () => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/test-repo-elektif/',
            headers: { 
              'Content-Type': 'application/json'
            },
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            // setJumlahElektifTersedia(response.data.length)
            setDataElektif(response.data);
        })
          .catch(function (error) {
            console.log(error);
          });
    }

    const getTertarikElektif = () => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/repo-list-tertarik/',
            headers: { 
              'Content-Type': 'application/json'
            },
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            setDataTertarik(response.data);
            // console.log(JSON.parse(localStorage.getItem("token")).data.MahasiswaId)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
        // getData();
        // getTertarikElektif();
    })

    useEffect(() => {
        getData();
        getTertarikElektif();
    }, [])

    const elektifTertarikDiikuti = dataTertarik.filter(item => item.id_civitas_ipb === JSON.parse(localStorage.getItem("token")).data.MahasiswaId)
    console.log(elektifTertarikDiikuti.length)
    
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
                    <PaperDashboard title="Jumlah elektif yang tersedia" counter={dataElektif.length} />
                    <PaperDashboard title="Jumlah elektif yang tertarik untuk diikuti" counter={elektifTertarikDiikuti.length} />
                    <PaperDashboard title="Semester saat ini" counter="Ga ada datanya"/>
                </div>
                <div className={classes.show}>
                    <PaperShow title="Daftar mata kuliah elektif tersedia semester" data={dataElektif}/>
                    <PaperShowElektif title="Mata Kuliah elektif yang tertarik diikuti" dataElektif={dataElektif} dataTertarik={elektifTertarikDiikuti} />
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
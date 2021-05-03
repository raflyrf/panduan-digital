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

const dummy = {
    jumlahElektif: 3,
    jumlahTertarik: 1,
    semester: 3
}

const matakuliah = [
    {
        nama: "KOM#@#"
    },
    {
        nama: "KO@3"
    },
    {
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

const MainView = () => {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Header />
            <div className="side-nav">
                {/* <ul>
                    <li><Link to="/" style={link}>Dashboard</Link></li>
                    <li><Link to="/matakuliah" style={link}>Mata Kuliah</Link></li>
                </ul> */}
                <div className={classes.root}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <Link to="/" style={link}>
                            <ListItem button>
                                    <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                        
                        <Link to="/matakuliah" style={link}>
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
                    <PaperShow title="Daftar mata kuliah tersedia semester genap" data={matakuliah}/>
                    <PaperShow title="Mata Kuliah elektif yang tertarik diikuti" data={matakuliah}/>
                </div>
                
            </div>
            
        </React.Fragment>
    );
}

const link = {
    textDecoration: "none"
}

export default MainView;
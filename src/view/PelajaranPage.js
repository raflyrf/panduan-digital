import React, { useEffect, useState } from 'react';
import './MainView.css'
import Header from '../component/Header'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import DATAMATKUL from '../component/dataDummyMataKuliah';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TableElektif from '../component/TableElektif';
import DATADUMMY from '../component/dataDummyTertarikElektif';
import ClearIcon from '@material-ui/icons/Clear';
import ListKomentar from '../component/ListKomentar';
import DATAKOMENTAR from '../component/dataDummyKomentar';
// import TambahKomentarCard from '../component/TambahKomentarCard';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop:20
    },    
    divider: {
        marginTop: 60
    },
    viewHeader: {
        display: "flex",
        justifyContent: "space-between"
    },
    button: {
        marginRight: theme.spacing(2)
    },
    tableElektif: {
        display: "flex",
        justifyContent: "center"
    }, 
    
    rootKomentar: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
      },
      margin: {
        margin: theme.spacing(1),
      },
      textField: {
        width: '100%',
      },
      paperKomentar: {
        display: 'flex',
        width: "70%"
      },
}));

const PelajaranPage = (props) => {
    const classes = useStyles();

    const [data, setData] = useState([])
    const [dataTertarik, setDataTertarik] = useState(DATADUMMY)
    
    const [isTertarik, setIsTertarik] = useState(false)

    useEffect(() => {
        const id = props.match.params.id
        console.log(id)

        // karna ada id, bisa get datanya menggunakan id itu
        // kalo ada end pointnya mungkin bisa gini const url = `http://localhost:8000/user/recipes/${id}`
        // sementara pake datadummy dulu
        const data = DATAMATKUL.find(item => item.id === parseInt(id))
        console.log(data)
        setData(data)
        
    }, [props.match.params.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // alert("Asik")
        if(isTertarik === false){
            // ini nanti ke proses post database
            const newDataTertarik = {
                id_peserta_tertarik: dataTertarik.length + 1,
                username: JSON.parse(localStorage.getItem("token")).name,
                // ini nanti ganti jadi nim
                nim: JSON.parse(localStorage.getItem("token")).role,
                id_mata_kuliah: parseInt(props.match.params.id),
                id_civitas_ipb: 99
            }

            setDataTertarik([...dataTertarik, newDataTertarik])
            setIsTertarik(!isTertarik)
        } else {
            // dataTertarik harusnya diambil dari database
            const harusnyaId = JSON.parse(localStorage.getItem("token")).name
            setDataTertarik(dataTertarik.filter(item => item.username !== harusnyaId))
            setIsTertarik(!isTertarik)
        }
        console.log(dataTertarik)
    }   
    

    const [komentarValues, setKomentarValues] = useState("")
    const [dataListKomentar, setDataListKomentar] = useState(DATAKOMENTAR)
    const handleSubmitKomentar = async (e) => {
        console.log(komentarValues)
        if(komentarValues.trim().length > 0){
            const newKomentarData = {
                id_komentar: dataListKomentar.length + 1,
                username: JSON.parse(localStorage.getItem("token")).name,
                nim: JSON.parse(localStorage.getItem("token")).role,
                komentar: komentarValues,
                id_mata_kuliah: parseInt(props.match.params.id),
                id_civitas_ipb: 99
            }
            setDataListKomentar([...dataListKomentar, newKomentarData])
            setKomentarValues("")
        }
    }

    return(
        <React.Fragment>
            <Header />
            <div className="side-nav">
                <div className={classes.root}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <Link to={{
                            pathname: "/dashboard"
                        }}  
                            style={link}>

                            <ListItem button>
                                    <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                        
                        <Link to={{
                            pathname: "/matakuliah"
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
                    <div className={classes.viewHeader}>
                        <Typography>{data.kodeMK}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={isTertarik ? <ClearIcon/> : <AddIcon />}
                            onClick={handleSubmit}
                            >
                            {isTertarik ? "Batal" : "Tertarik?"}
                        </Button>
                    </div>

                    <Divider className={classes.divider} />
                    <Typography>Deskripsi</Typography>
                    <Typography>Prasyarat</Typography>
                    <Typography>Dosen Pengajar</Typography>
                    <Typography>Daftar Mahasiswa yang tertarik mengikuti mata kuliah elektif ini</Typography>
                    <div className={classes.tableElektif}>
                        <TableElektif dataTertarik={dataTertarik} idMataKuliah={parseInt(props.match.params.id)} />
                    </div>
                    <Typography>Review</Typography>
                    
                    
                    {/* <TambahKomentarCard /> */}
                    <div className={classes.rootKomentar}>
                            <Paper className={classes.paperKomentar}>
                                <TextField value={komentarValues} 
                                        onChange={e => setKomentarValues(e.target.value)} 
                                        id="filled-multiline-static" 
                                        label="Tulis komentar" 
                                        multiline
                                        rows={2}
                                        variant="filled"
                                        className={clsx(classes.margin, classes.textField)} 
                                />    
                                <Button onClick={handleSubmitKomentar}>Kirim</Button>
                            </Paper>
                    <ListKomentar dataKomentar={dataListKomentar} idMataKuliah={parseInt(props.match.params.id)} />
                    </div>
            </div>
            
        </React.Fragment>
    );
}

const link = {
    textDecoration: "none"
}

export default PelajaranPage;
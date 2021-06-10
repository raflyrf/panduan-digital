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
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TableElektif from '../component/TableElektif';
import ClearIcon from '@material-ui/icons/Clear';
import ListKomentar from '../component/ListKomentar';
// import DATAKOMENTAR from '../component/dataDummyKomentar';
// import TambahKomentarCard from '../component/TambahKomentarCard';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';

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
    const [koordinator, setKoordinator] = useState([])
    const [dataTertarik, setDataTertarik] = useState([])
    
    const [isTertarik, setIsTertarik] = useState(false)
    const [komentarValues, setKomentarValues] = useState("")
    const [dataListKomentar, setDataListKomentar] = useState([])

    useEffect(() => {
        const id = props.match.params.id
        console.log(id)

        var config = {
            method: 'get',
            url: 'https://api.ipb.ac.id/v1/MataKuliah/DepartemenSaya?TahunAkademik=2020/2021&Semester=All&Strata=S1',
            headers: { 
              'X-IPBAPI-TOKEN': 'Bearer 62225dc6-925a-3bb6-af6c-45e427d7514c'
            }
          };
          
          axios(config)
          .then(function (response) {
            // console.log(response.data);
            const data = response.data.find(item => item.MataKuliahId === parseInt(id))
            console.log(data)
            console.log(data.Koordinator.Nama)
            setData(data)
            setKoordinator(data.Koordinator)
          })
          .catch(function (error) {
            console.log(error);
          });

        // const data = DATAMATKUL.find(item => item.id === parseInt(id))
        // console.log(data)
        // setData(data)
        
    }, [props.match.params.id])

    const getData = async () => {
        // const id = props.match.params.id

        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/repo-list-tertarik',
            headers: { 
              'Content-Type': 'application/json'
            }
          };
          
          await axios(config)
          .then(function (response) {
            console.log(response.data);
            // const data = response.data.filter(item => item.id_mata_kuliah === parseInt(id))
            // console.log(data)
            setDataTertarik(response.data)
            // setShowType(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const getDataKomentar = async () => {
      
      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/repo-list-komentar/',
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        setDataListKomentar(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    const checkIsTertarikCondition = async () => {
        const id = props.match.params.id
        console.log(JSON.parse(localStorage.getItem('token')).data.MahasiswaId)
        console.log(id)
        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/repo-list-tertarik',
            headers: { 
              'Content-Type': 'application/json'
            }
          };
          
          await axios(config)
          .then(function (response) {
            console.log(response.data);
            const findUser = response.data.find(item => ((item.id_mata_kuliah === parseInt(id)) && (item.id_civitas_ipb === JSON.parse(localStorage.getItem('token')).data.MahasiswaId)))
            if(findUser){
                setIsTertarik(true); 
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
        getData();
        getDataKomentar();
    }, [])

    useEffect(() => {
        checkIsTertarikCondition();
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        // alert("Asik")
        const res = await axios.get('http://localhost:8000/api/repo-list-tertarik', {
        headers: { 
          'Content-Type': 'application/json'
        }})

        console.log(res.data)
        // console.log(res.data[res.data.length-1].id)
        if(isTertarik === false){
            // ini nanti ke proses post database
            const newDataTertarik = {
                id: res.data.length === 0 ? res.data.length : res.data[res.data.length-1].id + 1,
                username: JSON.parse(localStorage.getItem("token")).data.Nama,
                nim: JSON.parse(localStorage.getItem("token")).data.NIM,
                id_mata_kuliah: parseInt(props.match.params.id),
                id_civitas_ipb: JSON.parse(localStorage.getItem("token")).data.MahasiswaId
            }

            var config = {
                method: 'post',
                url: 'http://localhost:8000/api/repo-add-tertarik',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : newDataTertarik
              };
              
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                setDataTertarik([...dataTertarik, newDataTertarik])
                setIsTertarik(!isTertarik)
              })
              .catch(function (error) {
                console.log(error);
              });

        } else {
            // dataTertarik harusnya diambil dari database
            const idUser = JSON.parse(localStorage.getItem("token")).data.MahasiswaId
            console.log(idUser)
            const id = props.match.params.id
            const checkUser = res.data.find(item => ((item.id_mata_kuliah === parseInt(id)) && (item.id_civitas_ipb === JSON.parse(localStorage.getItem('token')).data.MahasiswaId)))
            console.log(checkUser.id)
            if(checkUser){

                var configDel = {
                    method: 'delete',
                    url: `http://localhost:8000/api/repo-delete-tertarik/${checkUser.id}`,
                    headers: { 
                        'Content-Type': 'application/json'
                    }
                };
                
                axios(configDel)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setDataTertarik(dataTertarik.filter(item => item.id_civitas_ipb !== idUser))
                    setIsTertarik(!isTertarik)
                })
                .catch(function (error) {
                    console.log(error);
                });   
            }

        }
        console.log(dataTertarik)
    }   
    


    const handleSubmitKomentar = async (e) => {
        console.log(komentarValues)
        if(komentarValues.trim().length > 0){
            const newKomentarData = {
                id: dataListKomentar.length + 1,
                username: JSON.parse(localStorage.getItem("token")).data.Nama,
                nim: JSON.parse(localStorage.getItem("token")).data.NIM,
                komentar: komentarValues,
                id_mata_kuliah: parseInt(props.match.params.id),
                id_civitas_ipb: JSON.parse(localStorage.getItem("token")).data.MahasiswaId
            }

            var config = {
              method: 'post',
              url: 'http://127.0.0.1:8000/api/repo-add-komentar',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : newKomentarData
            };
            
            axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              setDataListKomentar([...dataListKomentar, newKomentarData])
              setKomentarValues("")
            })
            .catch(function (error) {
              console.log(error);
            });

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
                    <Typography>{data.Nama}</Typography>
                    <div className={classes.viewHeader}>
                        <Typography>{data.Kode}</Typography>
                        {props.location.state.type === "Elektif" ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={isTertarik ? <ClearIcon/> : <AddIcon />}
                            onClick={handleSubmit}
                            >
                            {isTertarik ? "Batal" : "Tertarik?"}
                        </Button>) : ("")}
                    </div>

                    <Divider className={classes.divider} />
                    <Typography>Deskripsi</Typography>
                    <Typography>Prasyarat</Typography>
                    <Typography>Dosen Koordinator</Typography>
                    <Typography>{koordinator.Nip} - {koordinator.NamaGelar}</Typography>
                    
                    <Typography>Daftar Mahasiswa yang tertarik mengikuti mata kuliah elektif ini</Typography>
                    {props.location.state.type === "Elektif" ? (
                    <div className={classes.tableElektif}>
                        <TableElektif dataTertarik={dataTertarik} idMataKuliah={parseInt(props.match.params.id)} />
                    </div>) : ("")}
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
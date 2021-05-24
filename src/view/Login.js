import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button, Paper } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    marginTop: 60
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    display: 'flex',
    flexDirection:"column",
    flexWrap: 'wrap',
  },

}));

const baseUrl = "https://reqres.in"

export default function Login() {
  const classes = useStyles();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { isAuthenticated, loginSuccess, loginFailed } = useContext(AuthContext)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    const user = {
        username: username,
        password: password
    }

        try {
            const res = await axios.post(`${baseUrl}/api/login`, user)
            localStorage.setItem("token", res.data.token)
            // console.log(res)
            // setUsername("")
            // setPassword("")
            loginSuccess()
        } catch (err) {
            console.log(err.response)
            setUsername("")
            setPassword("")
            loginFailed()
        }

    }

  if (isAuthenticated){
    return <Redirect to={{
      pathname: "/dashboard",
      state: {username: username}
    }} />
  }  

  return (
    <div className={classes.root}>
      <div className={classes.root} noValidate autoComplete="off">
            <Paper className={classes.paper}>
                <TextField value={username} onChange={e => setUsername(e.target.value)} id="standard-basic" label="Username" className={clsx(classes.margin, classes.textField)} />
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        />
                </FormControl>
                <Button onClick={handleSubmit}>Login</Button>
            </Paper>
      </div>
    </div>
  );
}

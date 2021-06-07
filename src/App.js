import React, { useEffect, useState } from 'react';
import './App.css';
import MainView from './view/MainView';
import { Route } from 'react-router-dom';
import MataKuliah from './view/MataKuliah';
import Login from './view/Login'

import { AuthProvider } from './context/auth'
import PrivateRoute from './route/PrivateRoutes'
import PelajaranPage from './view/PelajaranPage'

function App() {
  const [isLoggedIn, setStatus] = useState(localStorage.getItem("isLogin"))
  useEffect(() => {
    const status = localStorage.getItem("isLogin")
    setStatus(status)
  }, [])
  console.log("adasdad", isLoggedIn)
  return (
    isLoggedIn ? 
    ( <AuthProvider>

        <React.Fragment>
          <Route path="/dashboard" exact component={MainView}/>
          <Route path="/matakuliah" exact component={MataKuliah} />
          <Route path="/matakuliah/:id" exact component={PelajaranPage} />        
          <Route path="/" exact component={Login} />
        </React.Fragment>
   
      </AuthProvider> ) : (
        <AuthProvider>

        <React.Fragment>
          <PrivateRoute path="/dashboard" exact component={MainView}/>
          <PrivateRoute path="/matakuliah" exact component={MataKuliah} /> 
          <PrivateRoute path="/matakuliah/:id" exact component={PelajaranPage} />       
          <Route path="/" exact component={Login} />
        </React.Fragment>
   
      </AuthProvider>
      )
  );
}

export default App;

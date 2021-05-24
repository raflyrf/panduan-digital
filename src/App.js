import React from 'react';
import './App.css';
import MainView from './view/MainView';
import { Route } from 'react-router-dom';
import MataKuliah from './view/MataKuliah';
import Login from './view/Login'

import { AuthProvider } from './context/auth'
import PrivateRoute from './route/PrivateRoutes'

function App() {
  return (
    <AuthProvider>

        <React.Fragment>
          <PrivateRoute path="/dashboard" exact component={MainView}/>
          <PrivateRoute path="/matakuliah" exact component={MataKuliah} />        
          <Route path="/" exact component={Login} />
        </React.Fragment>
   
    </AuthProvider>
  );
}

export default App;

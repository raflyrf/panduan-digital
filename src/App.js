import React from 'react';
import './App.css';
import MainView from './view/MainView';
import { Route } from 'react-router-dom';
import MataKuliah from './view/MataKuliah';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route path="/" exact component={MainView}/>
        <Route path="/matakuliah" exact component={MataKuliah} />
      
      </React.Fragment>
    </div>
  );
}

export default App;

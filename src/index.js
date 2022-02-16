import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SongStat from './SongStat'
import AppBar from './AppBar';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Foot from './Foot';
import ScrollToTop from "react-scroll-to-top";

ReactDOM.render(
  <React.StrictMode>
    <ScrollToTop smooth />
    <AppBar />
    <div className="App">
      <header className="App-header" style={{paddingTop: '20px'}}>
        <Router>
          <Route path={['/', '/stat']} component={SongStat} />
        </Router>
        <Foot />
      </header>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

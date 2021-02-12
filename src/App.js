import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ExchangeRates from './Exchange-Rates';
import BaseSelector from './Base-Selector';
import Home from './Home';
import CurrencyConverter from './Currency-Converter';



const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const Footer = () => {
  return (
    <div class="mt-5 footer bg-primary" id="custom-footer">
      <p class="pl-5 mb-0 my-sm-1 mr-auto">© 2021 •&nbsp;Hunter Cline •&nbsp;<a href="https://twitter.com/hcline13" target="_blank"><i class="fab fa-twitter"></i></a> •&nbsp;<a href="https://www.linkedin.com/in/hunter-cline-33784913b/" target="_blank"><i class="fab fa-linkedin"></i></a> •&nbsp;<a href="https://github.com/hdcline" target="_blank"><i class="fab fa-github"></i></a></p>
    </div>
  )
}

const App = () => {
  return (
    <div>
    <Router>
    <nav class="navbar navbar-expand navbar-dark bg-primary">
    <Link to="/" className="navbar-brand">Home</Link>


    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link to="/" className="nav-link">Live Rates</Link>
      </li>
      <li class="nav-item active">
        <Link to="/currency-converter" className="nav-link">Currency Converter</Link>
      </li>
    </ul>
</nav>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/currency-converter" component={CurrencyConverter} />
      <Route component={NotFound} />
    </Switch>
  </Router>
  <Footer />
  </div>

  )

}

export default App;

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ExchangeRates from './Exchange-Rates';
import BaseSelector from './Base-Selector';
import Home from './Home';
import CurrencyConverter from './Currency-Converter';


/*const Home = () => {
  return <h2>Home</h2>;
}*/

const About = () => {
  return <h2>About</h2>;
}

const Contact = () => {
  return <h2>Contact</h2>;
}

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}


const App = () => {
  return (
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
  );
}

export default App;

import React from 'react';
import { json, checkStatus } from './utils';
import ExchangeRates from './Exchange-Rates';
import BaseSelector from './Base-Selector';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rates: null,
      option: 'USD',
      ratesList: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ option: event.target.value });
    console.log(event.target.value);

    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${event.target.value}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
        console.log(data);
        this.setState({ rates: data, error: '' });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });
  }


  componentDidMount () {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.option}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log(data);
      this.setState({ rates: data, error: '' });
      this.setState({ option: Object.keys(data.rates), error: '' });
      console.log(this.state.option);
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });
  }



  render() {
    if (!this.state.rates) {
      return null;
      console.log("rates is null");
    }
    const {
      base,
      date,
      rates,
    } = this.state.rates;


    return (
      <div className="container">
        <div className="row pt-5 justify-content-center">
          <div class="col-4 py-4">
            <BaseSelector onChange={this.handleChange} option='USD' id="base-rates"/>
          </div>
        </div>

        <div className="row pt-3 justify-content-center mb-5 pb-5">
          <ExchangeRates rates={this.state.rates} base={this.state.option}/>
        </div>
      </div>
    )
  }
}


export default Home;

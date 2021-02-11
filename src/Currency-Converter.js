import React from 'react';
import { json, checkStatus } from './utils';
import ExchangeRates from './Exchange-Rates';
import BaseSelector from './Base-Selector';
import Amount from './Amount';



const ConvertedAmount = (props) => {
  const {
    convertedAmount
  } = props;
  return (
    <h2>{convertedAmount}</h2>
  )
}

const SwitchCurrencyButton = (props) => {
  const {
    symbolFrom,
    symbolTo,
    onClick
  } = props;
  return (
    <button type="button" class="btn btn-primary" onClick={onClick}>Switch</button>
  )
}


class CurrencyConverter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rates: null,
      symbolFrom: 'USD',
      symbolTo: 'EUR',
      rateFrom: null,
      rateTo: null,
      convertedAmount: null,
      amount: 1
    };
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeFromCurrency = this.handleChangeFromCurrency.bind(this);
    this.handleChangeToCurrency = this.handleChangeToCurrency.bind(this);
    this.handleCurrencySwitch = this.handleCurrencySwitch.bind(this);
  }

  handleChangeAmount(event) {
    this.setState({ amount: event.target.value });
    console.log(event.target.value);
  }

  handleChangeFromCurrency(event) {
    this.setState({ symbolFrom: event.target.value});
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${event.target.value}&symbols=${this.state.symbolTo}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data.rates);
        this.setState({ rates: data, error: '' });
        console.log(data.rates[this.state.symbolTo]);
        this.setState({ rateTo: data.rates[this.state.symbolTo], error: '' });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });

  }

  handleChangeToCurrency(event) {
    this.setState({ symbolTo: event.target.value});
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.symbolFrom}&symbols=${event.target.value}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data.rates);
        this.setState({ rates: data, error: '' });
        console.log(data.rates[this.state.symbolTo]);
        this.setState({ rateTo: data.rates[this.state.symbolTo], error: '' });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  }

  handleCurrencySwitch(event) {
    let from = this.state.symbolFrom;
    let to = this.state.symbolTo;
    this.setState({ symbolFrom: to, symbolTo: from});

    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${to}&symbols=${from}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data.rates);
        this.setState({ rates: data, error: '' });
        console.log(data.rates[this.state.symbolTo]);
        this.setState({ rateTo: data.rates[this.state.symbolTo], error: '' });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  }


  componentDidMount () {
    console.log(this.state.option);
  fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.symbolFrom}&symbols=${this.state.symbolTo}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log(data.rates);
      this.setState({ rates: data, error: '' });
      console.log(data.rates[this.state.symbolTo]);
      this.setState({ rateTo: data.rates[this.state.symbolTo], error: '' });
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

    const conversion = (amount, rate) => amount * rate;

    console.log(this.state.amount);

    return (
      <div className="container">
        <div className="row pt-5 justify-content-center">
          <div class="col-4 py-5">
            <Amount onChange={this.handleChangeAmount}/>
          </div>
      </div>
      <div className="row pt-5 justify-content-center">
        <div class="col-sm-4 py-5">
          <BaseSelector onChange={this.handleChangeFromCurrency} option={this.state.symbolFrom}/>
        </div>
        <div class="col-sm-4 py-5">
          <SwitchCurrencyButton onClick={this.handleCurrencySwitch}/>
        </div>
        <div class="col-sm-4 py-5">
          <BaseSelector onChange={this.handleChangeToCurrency} option={this.state.symbolTo}/>
        </div>
        <div class="col-sm-4 py-5">
          <ConvertedAmount convertedAmount={conversion(this.state.amount, this.state.rateTo)}/>
        </div>
      </div>


      </div>
    )
  }
}


export default CurrencyConverter;

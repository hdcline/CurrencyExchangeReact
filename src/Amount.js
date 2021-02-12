import React from 'react';
import { json, checkStatus } from './utils';
import ExchangeRates from './Exchange-Rates';

class Amount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rates: null,
      option: 'USD',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //this.setState({ option: event.target.value });
    console.log('helloworld');
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=USD`)
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
      //document.getElementById('amount').defaultValue = "1";
      console.log(this.state.option);
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=USD&symbols=GBP,AUD`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data.rates);
        this.setState({ rates: data, error: '' });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  }



  render() {
    if (!this.state.rates) {
      return null;
    }
    const {
      base,
      date,
      rates
    } = this.state.rates;

    console.log(rates);

    return (
      <div>

      <label class="label" for="amount">Amount:</label>
      <input class="form-control" type="number" id="amount" name="amount" min="1" defaultValue="1" onChange={this.props.onChange}/>

      <label for="amount">Amount</label>
      <input type="number" id="amount" name="amount" min="1" defaultValue="1" onChange={this.props.onChange}/>

      </div>
    )
  }
}


export default Amount;

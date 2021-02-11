import React from 'react';
import { json, checkStatus } from './utils';
import ExchangeRates from './Exchange-Rates';

class BaseSelector extends React.Component {

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
      console.log(this.state.option);
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=USD`)
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

    //const rates = this.state.rates;
    //return null;

    let ratesKeys = [];
    for (let i in Object.keys(rates)){
      ratesKeys.push(Object.keys(rates)[i]);
    }
    console.log(rates);
    console.log(this.state.rates);

    const options = [];
    for (let i in ratesKeys) {
      if (ratesKeys[i] === this.props.option){
        options.push(<option key={ratesKeys[i]} value={ratesKeys[i]} selected>{ratesKeys[i]}</option>);
      }
      else {
        options.push(<option key={ratesKeys[i]} value={ratesKeys[i]}>{ratesKeys[i]}</option>);
      }
    }
    console.log(this.props.option);
    return (

      <select class="form-control custom-select" id={this.props.id} onChange={this.props.onChange}>
        {options}
      </select>
    )
  }
}


export default BaseSelector;

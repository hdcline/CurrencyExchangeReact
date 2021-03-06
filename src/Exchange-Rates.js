import React from 'react';
import { json, checkStatus } from './utils';

class ExchangeRates extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rates: null,
    }
  }

  componentDidMount () {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.props.base}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log(data);
      this.setState({ rates: data, error: '' });
      console.log(this.state.rates);
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });
  }


  render() {
    if (!this.props.rates) {
      return null;
    }
    const {
      base,
      date,
      rates,
    } = this.props.rates;
    //return null;

    return (
      <div className="col-7 col-sm-4 mx-auto px-auto">
        <h1 class="base text-primary">{base}</h1>
        <ul className="list-unstyled live-rates">
          <li>
            <p class="text-secondary">Date: {date}</p>
          </li>
          <li>
            {
              Object.keys(rates).map((key, index) => (
                <p key={index}><span class="text-primary">{index+1}</span>- {key}: {rates[key]}</p>
              ))
            }
          </li>
        </ul>
      </div>
    )
  }
}


export default ExchangeRates;

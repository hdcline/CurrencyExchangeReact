import React from 'react';
import { json, checkStatus } from './utils';
import BaseSelector from './Base-Selector';

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
      })
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

          <div className="col-4">
            <h1 class="">{base}</h1>
            <ul className="list-unstyled live-rates">
              <li>
                <p class="">Date: {date}</p>
              </li>
              <li>
                {
                  Object.keys(rates).map((key, index) => (
                    <p key={index}>{index+1}- {key}: {rates[key]}</p>
                  ))
                }
              </li>
            </ul>
          </div>

    )
  }
}


export default ExchangeRates;

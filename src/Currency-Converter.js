import React from 'react';
import Chart from 'chart.js';
import { json, checkStatus } from './utils';
import BaseSelector from './Base-Selector';
import Amount from './Amount';



const ConvertedAmount = (props) => {
  const {
    convertedAmount
  } = props;
  return (
    <p class="text-success text-center" id="converted-amount"> <span id="equals-sym"><strong>=</strong></span> {convertedAmount}</p>
  )
}

const SwitchCurrencyButton = (props) => {
  const {
    symbolFrom,
    symbolTo,
    onClick
  } = props;
  return (
    <button type="button" class="btn btn-primary btn-block" onClick={onClick}>Switch</button>
  )
}


class CurrencyConverter extends React.Component {

  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

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
    this.getHistoricalRates = this.getHistoricalRates.bind(this);
    this.buildChart = this.buildChart.bind(this);

    this.chartRef = React.createRef();
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
      this.getHistoricalRates(event.target.value, this.state.symbolTo);
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
      this.getHistoricalRates(this.state.symbolFrom, event.target.value);
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
      this.getHistoricalRates(to, from);
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

      this.getHistoricalRates(this.state.symbolFrom, this.state.symbolTo);
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });
  }

  //Start of chart additions
  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }



  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
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
      <div>
        <div className="container align-items-center mt-5">
          <div className="row pt-5 justify-content-start">
            <div class="col-sm-4">
              <Amount onChange={this.handleChangeAmount}/>
            </div>
          </div>

        <div className="row pt-5 justify-content-start">
          <div class="col-sm-4 py-2">
            <label class="label" for="from">From:</label>
            <BaseSelector id="from" onChange={this.handleChangeFromCurrency} option={this.state.symbolFrom}/>
          </div>
        </div>

        <div className="row mt-5">
          <div class="col-sm-4 my-5">
            <SwitchCurrencyButton onClick={this.handleCurrencySwitch}/>
          </div>

          <div class="col-sm-7 mb-5" id="currency-col-lg">
            <ConvertedAmount convertedAmount={conversion(this.state.amount, this.state.rateTo)}/>
          </div>
        </div>

        <div className="row pt-5 justify-content-start">
          <div class="col-sm-4 py-2">
            <label class="label" for="to">To:</label>
            <BaseSelector id="to" onChange={this.handleChangeToCurrency} option={this.state.symbolTo}/>
          </div>
          <div class="col-12 mt-4" id="equals-word">Equals:</div>
          <div class="col-12 pb-5" id="currency-col-xs">
            <ConvertedAmount convertedAmount={conversion(this.state.amount, this.state.rateTo)}/>
          </div>
          <div class="col-12 pb-3 mb-5 py-sm-5 my-sm-5">
            <canvas ref={this.chartRef} />
          </div>
        </div>

      </div>
    </div>
    )
  }
}


export default CurrencyConverter;

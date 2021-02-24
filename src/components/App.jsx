import React from 'react';
import Axios from 'axios';
import Modal from './modal.jsx';
import Prices from './prices.jsx';
import Chart from './chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [],
      range: [],
      currentRange: [],
    }
    this.resetRange = this.resetRange.bind(this);
    this.getRange = this.getRange.bind(this);
  }

  resetRange(e){
    e.preventDefault();
    Axios.get('/btc')
    .then(({ data }) => {
      let array = Object.entries(data.bpi);
      array.reverse();
      let result = Object.fromEntries(array);
      this.setState({
        currentRange: data,
        range: result,
      })
    })
    // this.setState({
    //   range: [],
    // })
  }
  componentDidMount() {
    Axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(data => {
      this.setState({
        current: data.data.bpi.USD.rate
      })
    })
    Axios.get('/btc')
    .then(({ data }) => {
      let array = Object.entries(data.bpi);
      array.reverse();
      let result = Object.fromEntries(array);
      this.setState({
        currentRange: data,
        range: result,
      })
    })

  }

  getRange(sYear, sMonth, sDay, eYear, eMonth, eDay) {
    Axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${sYear}-${sMonth}-${sDay}&end=${eYear}-${eMonth}-${eDay}`)
    .then(data => {
      let array = Object.entries(data.data.bpi);
      array.reverse();
      let result = Object.fromEntries(array);
      this.setState({
        range: result,
        orderedRange: data.data.bpi,
        currentRange: data.data
      })
    })
  }


  render () {
    const today = new Date();
    const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // console.log(this.state.currentRange.bpi)
    // let array = Object.entries(this.state.currentRange.bpi);
    // array.reverse();
    // let result = Object.fromEntries(array);
    let chartPoints = [];
    for (let key in this.state.currentRange.bpi) {
      chartPoints.push({ x: key, y: this.state.currentRange.bpi[key] });
    }
    const chartData = {
      datasets: [
        {
          label: 'BTC',
          data: chartPoints,
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'white'
        },
      ]
    };
    return (
    <div className="row justify-content-center">
      <h1 style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '3rem',
        marginTop: '10px',
        fontWeight: 'bolder',
        marginBottom: '10px',
        textShadow: '5px 5px #222529'
      }}><i style={{ fontSize: '3rem', textShadow: '3px 3px #222529' }} className="fab fa-bitcoin"></i> Ƀit Track <i style={{ textShadow: '2px 2px white', fontSize: '3rem', color: '#222529' }} className="fab fa-bitcoin"></i></h1>
      <Modal resetRange={this.resetRange} getRange={this.getRange}/>
      <div id="currentPrice" className="card col-10 text-white">
          <div   className="card-body text-center">
            Price Today ({date} @ {time}) ~ <i className="fas fa-dollar-sign"></i><strong>{this.state.current}</strong>
          </div>
      </div>
      <div className="col-10 justify-content-center">
        <Chart chartData={chartData} />
        <Prices current={this.state.current} range={this.state.range} />
      </div>

    </div>
    )
  }
}


export default App;




      {/* <Page results={this.state.results} />
        <div style={{ align: 'middle' }}>
          <ReactPaginate
          previousLabel={<i className="fas fa-arrow-circle-left"></i>}
          nextLabel={<i className="fas fa-arrow-circle-right"></i>}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages-pagination'}
          activeClassName={'active'}
          pageRangeDisplayed={10}
          />
        </div> */}
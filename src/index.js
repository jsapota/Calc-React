import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import InputRange from 'react-input-range'
import './index.css'
import './slider.css'

class Main extends Component {
  constructor(props) {
    super(props);
    this.calcRate = this.calcRate.bind(this);
    this.state = {
      value: 5000,
      rates: -1,
      accidentsRate: 1,
      minValue: 100,
      maxValue: 10000,
      step: 10
    }
  }

  calcRate() {
    let value = this.state.value;
    let cost = 0;
    if (this.state.rates < 0)
      this.setState({rates: -2});
    else {
      if (value < 1001)
        cost = 20;
      else if (value < 3001)
        cost = 70;
      else if (value < 6001)
        cost = 130;
      else if (value < 9001)
        cost = 180;
      else
        cost = 200;
      let result = Math.ceil(cost * this.state.rates * this.state.accidentsRate);
      document.getElementById("resultField").innerHTML = '<b id="resultField">' + result + '</b>zł'
    }
  }

  render() {
    return (
      <div className="container calculator text-center">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="calc-title">Kalkulator</h1>
          </div>
        </div>
        <div className="row calc-content">
          <div className="col-sm-12">
            <div className="row sum">
              <div className="col-sm-12">
                <p className="bar-title">Suma ubezpieczenia</p>
              </div>
              <div className="col-sm-12 input-box">
                <div className="row">
                  <div className="col-sm-12">
                    <InputRange
                      maxValue={this.state.maxValue}
                      minValue={this.state.minValue}
                      step={this.state.step}
                      value={this.state.value}
                      onChange={value => this.setState({value})}/>
                  </div>
                  <div className="col-sm-12 visible-xs visible-sm hidden-md silder-buttons">
                    <div className="row">
                      <div className="col">
                        <div className="arrow left" onClick={
                          () => {
                            if (this.state.value > this.state.minValue + this.state.step)
                              this.setState({value: this.state.value - this.state.step});
                            else
                              this.setState({value: this.state.minValue});
                          }}>
                          <i className="fa fa-angle-left fa-2x"/>
                        </div>
                      </div>
                      <div className="col middle">
                        <p className="slider-value">{this.state.value}</p>
                      </div>
                      <div className="col">
                        <div className="arrow right" onClick={
                          () => {
                            if (this.state.value < this.state.maxValue - this.state.step)
                              this.setState({value: this.state.value + this.state.step});
                            else
                              this.setState({value: this.state.maxValue});
                          }}>
                          <i className="fa fa-angle-right fa-2x"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row amount">
              <div className="col-sm-12 col-md-2">
                <p className="bar-title">Ilość rat</p>
              </div>
              <div className="col-sm-12 col-md-10">
                <p className={this.state.rates === -2 ? 'error-text' : 'error-none'}>Aby obliczyć składkę wybierz
                  ilość
                  rat</p>
              </div>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-12 col-md-3">
                    <button className={this.state.rates === 0.98 ? 'btn-calc btn-chosen' : 'btn-calc'}
                            onClick={ () => this.setState({rates: 0.98})}>1 rata
                    </button>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <button className={this.state.rates === 1.0 ? 'btn-calc btn-chosen' : 'btn-calc'}
                            onClick={ () => this.setState({rates: 1.0})}>2 raty
                    </button>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <button className={this.state.rates === 1.04 ? 'btn-calc btn-chosen' : 'btn-calc'}
                            onClick={ () => this.setState({rates: 1.04})}>4 raty
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row state">
              <div className="col-sm-12">
                <p className="bar-title">Stan</p>
              </div>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-12 col-md-3">
                    <button className={this.state.accidentsRate === 0.95 ? 'btn-calc btn-chosen' : 'btn-calc'}
                            onClick={ () => {
                              if (this.state.accidentsRate === 0.95)
                                this.setState({accidentsRate: 1.0});
                              else
                                this.setState({accidentsRate: 0.95});
                            }
                            }>brak szkód
                    </button>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <button className={this.state.accidentsRate === 1.08 ? 'btn-calc btn-chosen' : 'btn-calc'}
                            onClick={
                              () => {
                                if (this.state.accidentsRate === 1.08)
                                  this.setState({accidentsRate: 1.0});
                                else
                                  this.setState({accidentsRate: 1.08});
                              }}>wyrządzona szkoda
                    </button>
                  </div>
                  <div className="col-sm-12 col-md-6 text-left">
                    <p className="state-text">Brak wyboru oznacza nowego klienta bez przeszlości</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row calculate">
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-12 col-md-4">
                    <button className="btn-calculate" onClick={this.calcRate}>Oblicz składkę</button>
                  </div>
                  <div className="col-sm-12 col-md-4 col-md-offset-4 result-box-margin">
                    <div className="result-box">
                      <p className="result-text" id="resultField"/>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

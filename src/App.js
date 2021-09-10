import './App.css';
import React, { Component } from 'react'
import LineGraph from './components/LineGraph';
import Tabel from './components/Tabel';
import BarGraph from './components/BarGraph';

var socket = new WebSocket("wss://city-ws.herokuapp.com/")

export default class App extends Component {

  state = {
    data: [],
    isLineGrpah: true,
    isBarGraph: false
  }

  componentDidMount() {
    socket.addEventListener('open', this.openEventListener)
    socket.addEventListener('message', this.incomingDataListener)
    socket.addEventListener('close', this.closeSocket)
    console.log("in component mount");
  }

  openEventListener = (e) => {
    console.log("on open", e);
  }

  incomingDataListener = (e) => {

    this.setState({ data: JSON.parse(e.data) });
    // this.props.dispatch(updateSocketData({payload: JSON.parse(e.data)}));

  }
  closeSocket = (e) => {
    console.log(e);
  }


  handleChangeChk = (e) => {
    console.log('checked', e)
    if (e.target.name === 'line') {
      this.setState({ isLineGrpah: !this.state.isLineGrpah })
    } else {
      this.setState({ isBarGraph: !this.state.isBarGraph })
    }
  }
  render() {


    return (
      <div className="flex-box flex-wrap space-evenly p-10">
        <div className="graph-container">
          {this.state.isLineGrpah ? <LineGraph data={this.state.data}></LineGraph> : ''}
          {this.state.isBarGraph ? <BarGraph data={this.state.data} /> : ''}
        </div>

        <div>
          <div className="p-10">
            <input type="checkbox" name="line" id="line" defaultChecked={this.state.isLineGrpah} onChange={(e) => this.handleChangeChk(e)} />
            <label for="line">line</label>
            <input type="checkbox" className="ml-10" name="bar" id="bar" defaultChecked={this.state.isBarGraph} onChange={(e) => this.handleChangeChk(e)} />
            <label for="bar">Bar</label>
          </div>
          <Tabel data={this.state.data} />
        </div>



      </div>
    )
  }
}

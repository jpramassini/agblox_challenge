import React, { Component } from "react";
import * as d3 from "d3";
import Papa from "papaparse";
import ParameterChooser from "./components/parameterChooser";
import LineGraph from "./visualizations/lineGraph";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParams: {},
      paramNames: [],
      monochrome: true
    };
    this.updateData = this.updateData.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  parseData() {
    let csvFile = require("./data_sample.csv");
    //let Papa = require("papaparse/papaparse.min.js")
    Papa.parse(csvFile, {
      header: true,
      download: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: this.updateData
    });
  }

  setParamNames() {
    let paramNames = Object.keys(this.state.data[0]);
    paramNames.shift(); // Pop timestamp off, not hideable by user
    this.setState({ paramNames });
  }

  updateData(res) {
    console.log(res);
    let parseDate = d3.timeParse("%Y-%m-%d %H");
    // Convert each ts value to a JS date usable by D3 and native JS functions.
    let data = res.data.map(item => {
      let tsOriginal = item.ts;
      item.ts = parseDate(tsOriginal);
      return item;
    });
    console.log(data);
    this.setState({ data });
    this.setParamNames();
    console.log(this.state);
  }

  componentWillMount() {
    this.parseData();
  }

  handleCheck(changeEvent) {
    this.setState({ monochrome: !this.state.monochrome });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>AgBlox Data Visualization Challenge</h2>
        </header>{" "}
        <LineGraph
          data={this.state.data}
          paramName={this.state.paramNames[10]}
          monochrome={this.state.monochrome}
        />
        <label>Color</label>
        <input type="checkbox" onChange={this.handleCheck} />
      </div>
    );
  }
}

export default App;

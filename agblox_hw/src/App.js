import React, { Component } from "react";
import * as d3 from "d3";
import Papa from "papaparse";
import ParameterChooser from "./components/parameterChooser";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParams: {},
      color: true
    };
    this.updateData = this.updateData.bind(this);
  }

  parseData() {
    let csvFile = require("./data_sample.csv");
    //let Papa = require("papaparse/papaparse.min.js")
    Papa.parse(csvFile, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
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
    console.log(this.state);
  }

  componentWillMount() {
    this.parseData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>AgBlox Data Visualization Challenge</h2>
        </header>{" "}
        <ParameterChooser data={this.state.data} />
      </div>
    );
  }
}

export default App;

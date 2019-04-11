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
      selectedParams: ["speed_mph", "rel_speed"],
      paramNames: [],
      monochrome: false,
      splitData: {}
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

  splitData() {
    let splitData = {};
    for (var item of this.state.data) {
      for (var name of this.state.paramNames) {
        if (splitData[name] === undefined) {
          splitData[name] = [];
        }
        splitData[name].push({ time: item.ts, value: item[name] });
      }
    }
    return splitData;
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
    this.setState({ splitData: this.splitData() });
  }

  componentWillMount() {
    this.parseData();
  }

  handleCheck(changeEvent) {
    this.setState({ monochrome: !this.state.monochrome });
  }

  render() {
    console.log(this.state);
    console.log(Object.entries(this.state.splitData).length);
    if (Object.entries(this.state.splitData).length !== 0) {
      return (
        <div className="App">
          <header className="App-header">
            <h2>AgBlox Data Visualization Challenge</h2>
          </header>{" "}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gridGap: "25px",
              height: "80vh",
              width: "95vw",
              marginLeft: "2.5vw",
              marginRight: "2.5vw",
              marginTop: "2.5vh",
              marginBottom: "2.5vh"
            }}
          >
            <div
              style={{
                borderRadius: "20px",
                boxShadow:
                  "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)"
              }}
            >
              <h2>Options</h2>
              <ParameterChooser
                paramNames={this.state.paramNames}
                selectedParams={this.state.selectedParams}
              />
              <label>Monochrome Mode</label>
              <input
                type="checkbox"
                value={this.state.monochrome}
                onChange={this.handleCheck}
              />
            </div>
            <LineGraph
              style={{
                borderRadius: "20px",
                boxShadow:
                  "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)"
              }}
              monochrome={this.state.monochrome}
              data={this.state.splitData}
              selectedParams={this.state.selectedParams}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h2>AgBlox Data Visualization Challenge</h2>
          </header>{" "}
          <label>Color</label>
          <input type="checkbox" onChange={this.handleCheck} />
        </div>
      );
    }
  }
}

export default App;

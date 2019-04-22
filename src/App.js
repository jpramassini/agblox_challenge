import React, { Component } from "react";
import * as d3 from "d3";
import Papa from "papaparse";
import { Range } from "rc-slider";
import ParameterChooser from "./components/parameterChooser";
import LineGraph from "./visualizations/lineGraph";
import YearSlider from "./components/yearSlider";
import "./App.css";

const isMobile = window.innerWidth <= 500;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParams: ["speed_mph", "snow_rate_in_hr"],
      paramNames: [],
      monochrome: false,
      splitData: {},
      dateRange: {
        min: null,
        max: null
      }
    };
    this.updateData = this.updateData.bind(this);
    this.handleColorChecked = this.handleColorChecked.bind(this);
    this.handleParamChecked = this.handleParamChecked.bind(this);
    this.setDateRange = this.setDateRange.bind(this);
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

  setDateRange(min, max) {
    let dateRange = { min, max };
    this.setState({ dateRange });
    console.log(dateRange);
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
    this.setState({ data });
    this.setParamNames();
    this.setState({ splitData: this.splitData() });
    let times = this.state.splitData.speed_mph.map(item => {
      return item.time;
    });
    this.setState({
      dateRange: { min: times[0], max: times[times.length - 1] }
    });
    console.log(this.state.splitData);
  }

  handleParamChecked(event) {
    let name = event.target.name;
    let tempArr = this.state.selectedParams;
    if (tempArr.includes(name)) {
      // Don't allow last item to be removed.
      if (tempArr.length !== 1) {
        tempArr.splice(tempArr.indexOf(name), 1);
      }
    } else {
      tempArr.push(name);
    }
    this.setState({ selectedParams: tempArr });
  }

  componentWillMount() {
    this.parseData();
  }

  handleColorChecked(changeEvent) {
    this.setState({ monochrome: !this.state.monochrome });
  }

  render() {
    console.log(this.state);
    if (
      Object.entries(this.state.splitData).length !== 0 &&
      this.state.dateRange.min !== null
    ) {
      return (
        <div className="App">
          <header className="App-header">
            <h2>AgBlox Data Visualization Challenge</h2>
          </header>{" "}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `${isMobile ? "1fr" : "1fr 3fr"}`,
              gridGap: "25px",
              height: "85vh",
              width: "95vw",
              marginLeft: "2.5vw",
              marginRight: "2.5vw",
              marginTop: "2vh",
              marginBottom: "2vh"
            }}
          >
            <div
              style={{
                borderRadius: "20px",
                boxShadow:
                  "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
                minWidth: "350px",
                marginBottom: "2vh"
              }}
            >
              <h2>Options</h2>
              <ParameterChooser
                paramNames={this.state.paramNames}
                selectedParams={this.state.selectedParams}
                onChecked={this.handleParamChecked}
              />
              <h4 style={{ marginTop: "10%" }}>Date Range</h4>
              <YearSlider
                times={this.state.splitData.speed_mph.map(item => {
                  return item.time;
                })}
                setDateRange={this.setDateRange}
              />
              <label style={{ fontWeight: 700 }}>Monochrome Mode</label>
              <input
                type="checkbox"
                value={this.state.monochrome}
                onChange={this.handleColorChecked}
                style={{ marginBottom: 10 }}
              />
            </div>
            <LineGraph
              style={{
                borderRadius: "20px",
                boxShadow:
                  "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
                minWidth: "350px"
              }}
              monochrome={this.state.monochrome}
              data={this.state.splitData}
              selectedParams={this.state.selectedParams}
              dateRange={this.state.dateRange}
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
          <input type="checkbox" onChange={this.handleColorChecked} />
        </div>
      );
    }
  }
}

export default App;

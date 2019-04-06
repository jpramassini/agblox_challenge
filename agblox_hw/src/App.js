import React, { Component } from "react";
import Papa from "papaparse";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  updateData(res, file) {
    const data = res.data;
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
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code> src / App.js </code> and save to reload.{" "}
          </p>{" "}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn My Ass{" "}
          </a>{" "}
        </header>{" "}
      </div>
    );
  }
}

export default App;

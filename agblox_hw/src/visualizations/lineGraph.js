import React, { Component } from "react";
import Plot from "react-plotly.js";
import * as d3 from "d3";

const width = 1000;
const height = 800;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const red = "#eb6a5b";
const blue = "#52b6ca";

var transition = {
  duration: 250,
  easing: "cubic-in-out"
};

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slicedData: null
    };
  }

  // This is for showing only sliced data, could be controlled with a slider later.
  /*static getDerivedStateFromProps(props, prevState) {
    if (!props.data) return null;
    let slicedData = props.data.slice(0, 100);
    return { slicedData };
  }*/

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (this.props.data) {
      //this.computePlots();
    }
  }

  computePlots() {
    if (this.props.data !== {}) {
      var plots = [];
      console.log(this.props.data);
      for (var name of this.props.selectedParams) {
        let plot = {
          x: this.props.data[name].map(item => {
            return item.time;
          }),
          y: this.props.data[name].map(item => {
            return item.value;
          }),
          mode: "markers",
          text: this.props.data[name].map(item => {
            return `<b>Timestamp:</b> ${
              item.time
            }<br><b>Parameter:</b> ${name}`;
          }),
          marker: { color: this.props.monochrome ? "#282c34" : red }
        };
        plots.push(plot);
      }
      console.log(plots);
    } else {
      return <div />;
    }
  }

  render() {
    if (this.props.data) {
      console.log(this.props);
      if (this.props.selectedParams.length > 1) {
        return (
          <div style={this.props.style}>
            <Plot
              style={{
                height: "98%",
                width: "98%",
                marginTop: "1%",
                marginBottom: "1%",
                marginRight: "1%",
                marginLeft: "1%"
              }}
              data={[
                {
                  x: this.props.data[this.props.selectedParams[0]].map(item => {
                    return item.value;
                  }),
                  y: this.props.data[this.props.selectedParams[1]].map(item => {
                    return item.value * 69.32;
                  }),
                  mode: "markers",
                  marker: {
                    color: this.props.monochrome ? "#282c34" : red,
                    maxdisplayed: 3000
                  }
                }
              ]}
              layout={{
                yaxis: {
                  fixedrange: true
                },
                transition: transition,
                title: `${this.props.selectedParams[0]} vs. ${
                  this.props.selectedParams[1]
                }`
              }}
              config={{
                scrollZoom: true,
                displayModeBar: false,
                responsive: true
              }}
            />
          </div>
        );
      } else {
        // Else, use time as x-axis value
        return (
          <div style={this.props.style}>
            <Plot
              style={{
                height: "98%",
                marginTop: "1%",
                marginBottom: "1%",
                marginRight: "1%",
                marginLeft: "1%"
              }}
              data={[
                {
                  x: this.props.data[this.props.selectedParams[0]].map(item => {
                    return item.time;
                  }),
                  y: this.props.data[this.props.selectedParams[0]].map(item => {
                    return item.value * 69.32;
                  }),
                  mode: "markers",
                  marker: {
                    color: this.props.monochrome ? "#282c34" : red,
                    maxdisplayed: 3000
                  }
                }
              ]}
              layout={{
                yaxis: {
                  fixedrange: true
                },
                transition: transition,
                title: `${this.props.selectedParams[0]}`
              }}
              config={{
                scrollZoom: true,
                displayModeBar: false,
                responsive: true
              }}
            />
          </div>
        );
      }
    } else {
      return <div />;
    }
  }
}

export default LineGraph;

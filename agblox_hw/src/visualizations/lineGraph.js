import React, { Component } from "react";
import Plot from "react-plotly.js";
import * as d3 from "d3";

const width = 1000;
const height = 800;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const colors = [
  "#4286f4", // blue
  "#eb6a5b", // red
  "#0ece50", // green
  "#fcea25", // yellow
  "#fc9725", // orange
  "#282c34", // off - black
  "#757171", // dark grey
  "#6316ce", // indigo
  "#e03edb", // magenta
  "#49ccbc", // aqua
  "#1e196d", // dark blue
  "#541525", // burgundy
  "#155430", // forest green
  "#542515", // brown
  "#996f38" // tan
];

var transition = {
  duration: 250,
  easing: "cubic-in-out"
};

var getTitle = selectedParams => {
  let title = "";
  for (var name of selectedParams) {
    if (
      // if element is the last on in the array, don't add comma.
      selectedParams[selectedParams.length - 1] === name
    ) {
      title += `${name}`;
    } else {
      title += `${name}, `;
    }
  }
  console.log(title);
  return title;
};

var computePlots = props => {
  var plots = [];
  console.log(props);
  for (var i = 0; i < props.selectedParams.length; i++) {
    console.log(i);
    let paramName = props.selectedParams[i];
    console.log(typeof paramName);
    let plot = {
      x: props.data[paramName].map(item => {
        return item.time;
      }),
      y: props.data[paramName].map((item, index) => {
        if (paramName.includes("speed") && paramName !== "ref_speed") {
          return item.value * props.data["ref_speed"][index].value;
        }
        return item.value;
      }),
      name: paramName,
      mode: "markers",
      marker: {
        color: props.monochrome ? "#282c34" : colors[i],
        maxdisplayed: 1000
      }
    };
    plots.push(plot);
  }
  console.log(plots);
  return plots;
};

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        yaxis: {
          fixedrange: true
        },
        transition: transition,
        title: ""
      },
      config: {
        scrollZoom: true,
        displayModeBar: false,
        responsive: true
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps) return null;
    if (nextProps.selectedParams) {
      var layout = { ...prevState.layout };
      layout.title = getTitle(nextProps.selectedParams);
      var data = computePlots(nextProps);
      return { layout, data };
    }
    return null;
  }

  /*componentDidMount() {
    if (this.props.data) {
      this.computePlots();
    }
  }*/

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
              data={this.state.data}
              layout={this.state.layout}
              config={this.state.config}
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
              data={this.state.data}
              layout={this.state.layout}
              config={this.state.config}
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

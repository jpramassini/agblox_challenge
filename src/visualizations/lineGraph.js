import React, { Component } from "react";
import Plot from "react-plotly.js";
import * as d3 from "d3";
import _ from "lodash";

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
  console.log(props.selectedParams);
  for (var i = 0; i < props.selectedParams.length; i++) {
    console.log(i);
    let paramName = props.selectedParams[i];
    console.log(typeof paramName);
    console.log(props.dateRange);
    let timeFilteredData = props.data[paramName].filter(item => {
      return item.time > props.dateRange.min && item.time < props.dateRange.max;
    });
    console.log(timeFilteredData);
    let plot = {
      x: timeFilteredData.map(item => {
        return item.time;
      }),
      y: timeFilteredData.map((item, index) => {
        if (paramName.includes("speed") && paramName !== "ref_speed") {
          // Making speed values actual speed based on ref_speed.
          return item.value * props.data["ref_speed"][index].value;
        } else if (paramName.includes("ref_speed")) {
          return item.value;
        } else {
          return item.value * 100; // Expanding other sets normalized from 0 to 1 to 0 to 100 to better fit graph.
        }
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
        xaxis: {
          autoscale: true
        },
        yaxis: {
          fixedrange: true,
          autoscale: true
        },
        transition: transition,
        title: "",
        dataRevision: 0
      },
      config: {
        scrollZoom: true,
        //displayModeBar: false,
        autoScale: true,
        responsive: true,
        displaylogo: false,
        modeBarButtonsToRemove: [
          "toImage",
          "select2d",
          "lasso2d",
          "toggleSpikelines"
        ]
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
      return <div />;
    }
  }
}

export default LineGraph;

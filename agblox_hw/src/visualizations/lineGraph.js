import React, { Component } from "react";
import Plot from "react-plotly.js";

const width = 1000;
const height = 800;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const red = "#eb6a5b";
const blue = "#52b6ca";

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slicedData: null
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    if (!props.data) return null;
    let slicedData = props.data.slice(0, 100);
    return { slicedData };
  }

  render() {
    if (this.state.slicedData) {
      return (
        <Plot
          data={[
            {
              x: this.state.slicedData.map(item => {
                return item.time;
              }),
              y: this.state.slicedData.map(item => {
                return item.value;
              }),
              type: "line + scatter",
              mode: "points",
              marker: { color: this.props.monochrome ? "#282c34" : red }
            }
          ]}
          layout={{
            width: width,
            height: height,
            title: `${this.props.selectedParams[0]}`,
            displayModeBar: false
          }}
        />
      );
    } else {
      return <div />;
    }
  }
}

export default LineGraph;

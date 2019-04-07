import React, { Component } from "react";
import * as d3 from "d3";

const svgWidth = 1200;
const svgHeight = 1000;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = svgWidth - (margin.left + margin.right);
const height = svgHeight - (margin.top + margin.bottom);

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
    this.xAxis = React.createRef();
    this.yAxis = React.createRef();
  }

  drawLineGraph() {
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);
    console.log(
      d3.extent(this.props.data, d => {
        return d.ts;
      })
    );
    let xScale = d3.scaleTime().range([margin.left, width - margin.right]);
    let yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
    if (this.props.data) {
      console.log(d3.extent(this.props.data, d => d.rel_speed));
      const timeDomain = d3.extent(this.props.data, d => d.ts);
      const max = d3.max(this.props.data, d => d.rel_speed);
      xScale.domain(timeDomain);
      yScale.domain([0, max]);
    }
    let xAxis = d3
      .axisBottom()
      .scale(xScale)
      .tickFormat("%Y-%m-%d %H");
    let yAxis = d3
      .axisLeft()
      .scale(yScale)
      .tickFormat(d => d);

    let line = d3
      .line()
      .x(d => xScale(d.ts))
      .y(d => yScale(d.rel_speed))
      .curve(d3.curveBasis);

    return (
      <path
        fill="none"
        stroke="#282c34"
        strokeWidth="1"
        d={line(this.props.data)}
      />
    );
  }

  componentDidUpdate() {
    /*d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);*/
  }

  render() {
    if (this.props.data) {
      return (
        <svg zindex={1000} ref={this.svg} height={height} width={width}>
          {this.drawLineGraph()}
          />
          <g>
            <g
              ref="xAxis"
              transform={`translate(0, ${height - margin.bottom})`}
            />
            <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
          </g>
        </svg>
      );
    } else {
      return <div />;
    }
  }
}

export default LineGraph;

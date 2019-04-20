import React, { Component } from "react";
import * as d3 from "d3";

const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const red = "#eb6a5b";
const blue = "#52b6ca";

class LineGraph extends Component {
  state = {
    // svg path command for graph
    lines: [],
    // d3 helpers
    xScale: d3.scaleTime().range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
    lineGenerator: d3.line()
  };

  xAxis = d3
    .axisBottom()
    .scale(this.state.xScale)
    .tickFormat(d3.timeFormat("%Y-%m-%d %H"));
  yAxis = d3
    .axisLeft()
    .scale(this.state.yScale)
    .tickFormat(d => `${d}`);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const { data } = nextProps;
    const { xScale, yScale, lineGenerator } = prevState;

    // data has changed, so recalculate scale domains
    const timeDomain = d3.extent(data, d => d.ts);
    const tempMax = d3.max(data, d => d.rel_speed);
    xScale.domain(timeDomain);
    yScale.domain([0, tempMax]);

    // calculate lines for all passed values
    let lines = [];
    for (var item of nextProps.selectedParams) {
      lineGenerator.x(d => xScale(d.ts));
      lineGenerator.y(d => yScale(d[item]));
      lineGenerator.curve(d3.curveBasis);
      const lineValues = lineGenerator(data);
      lines.push(
        <path
          d={lineValues}
          fill="none"
          stroke={nextProps.monochrome ? "#282c34" : blue}
          strokeWidth="2"
          key={item.ts}
        />
      );
    }
    return { lines };
  }

  componentDidUpdate() {
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
    //var svg = d3.select(this.refs.svg).call();
  }

  render() {
    return (
      <svg
        ref="svg"
        width={width}
        height={height}
        zoomTransform={this.zoomTransform}
        zoomType="scale"
      >
        <g>{this.state.lines}</g>
        <g>
          <g
            ref="xAxis"
            transform={`translate(0, ${height - margin.bottom})`}
          />
          <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default LineGraph;

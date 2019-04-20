import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Range = Slider.createSliderWithTooltip(Slider.Range);

export default class YearSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: this.props.times,
      min: null,
      max: null,
      value: []
    };

    this.initMinMax = this.initMinMax.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  initMinMax() {
    let min = this.state.times[0].getTime();
    let max = this.state.times[this.state.times.length - 1].getTime();
    let value = [min, max];
    this.setState({ value, min, max });
  }

  handleChange(value) {
    let minDate = new Date(value[0]);
    let maxDate = new Date(value[1]);
    this.props.setDateRange(minDate, maxDate);
    this.setState({ value });
  }

  componentWillMount() {
    this.initMinMax();
  }

  render() {
    return (
      <Range
        style={{
          width: "85%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "7%"
        }}
        min={this.state.min}
        max={this.state.max}
        value={this.state.value}
        onChange={this.handleChange}
        allowCross={false}
        tipProps={{
          placement: "bottom",
          prefixCls: "rc-slider-tooltip"
        }}
        pushable={true}
        tipFormatter={value => {
          let date = new Date(value);
          let dateString = date.toUTCString();
          return dateString;
        }}
      />
    );
  }
}

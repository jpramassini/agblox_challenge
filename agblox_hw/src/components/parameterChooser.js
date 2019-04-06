import React from "react";

const ParameterChooser = props => {
  console.log(props);
  if (props.data !== undefined) {
    let paramNames = Object.keys(props.data[0]);
    paramNames.shift(); // Pop timestamp off, not hideable by user
    console.log(paramNames);
    var counter;
    const listItems = paramNames.map(name => {
      return (
        <li key={name}>
          <input type="checkbox" name={`param${counter++}`} value={name} />
          <label>{name}</label>
        </li>
      );
    });
    return <ul>{listItems}</ul>;
  } else {
    return <div />;
  }
};

export default ParameterChooser;

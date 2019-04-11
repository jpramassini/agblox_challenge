import React from "react";

const ParameterChooser = props => {
  console.log(props);
  if (props.paramNames) {
    var counter;
    const listItems = props.paramNames.map(name => {
      return (
        <div
          style={{
            borderRadius: "7px",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.10)",
            justifySelf: "center",
            width: "100%",
            height: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Roboto",
            fontWeight: "700"
          }}
          key={name}
        >
          <label>{name}</label>
          <input type="checkbox" name={`param${counter++}`} value={name} />
        </div>
      );
    });
    return (
      <div
        style={{
          height: "66%",
          width: "85%",
          margin: "auto",
          display: "grid",
          gridGap: "1em",
          gridTemplateColumns: "1fr 1fr",
          gridAutoRows: "1fr"
        }}
      >
        {listItems}
      </div>
    );
  } else {
    return <div />;
  }
};

export default ParameterChooser;

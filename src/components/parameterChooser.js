import React from "react";

const ParameterChooser = props => {
  console.log(props);
  if (props.paramNames) {
    var counter;
    const listItems = props.paramNames.map(name => {
      return (
        <div
          style={{
            padding: "1%",
            borderRadius: "7px",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.10)",
            justifySelf: "center",
            width: "100%",
            height: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700"
          }}
          key={name}
        >
          <label style={{ wordBreak: "word-wrap", fontSize: "1em" }}>
            {name}
          </label>
          <input
            type="checkbox"
            name={name}
            value={name}
            checked={props.selectedParams.includes(name)}
            onChange={props.onChecked}
          />
        </div>
      );
    });
    return (
      <div
        style={{
          height: "75%",
          width: "85%",
          margin: "auto",
          marginBottom: "5%",
          display: "grid",
          gridGap: "1.5em",
          gridTemplateColumns: "1fr",
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

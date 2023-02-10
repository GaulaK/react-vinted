import { useState } from "react";
import { Range } from "react-range";

const PriceIntervalBar = () => {
  const [state, setState] = useState({ values: [50] });
  return (
    <Range
      step={5}
      min={0}
      max={500}
      values={state.values}
      onChange={(values) => setState({ values })}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            backgroundColor: "blue",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "42px",
            width: "42px",
            backgroundColor: "#999",
          }}
        />
      )}
    />
  );
};

export default PriceIntervalBar;

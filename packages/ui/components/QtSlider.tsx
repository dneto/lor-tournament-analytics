import { Slider } from "@mui/material";
import * as React from "react";

type QtSliderProps = {
  value: number;
  max: number;
};

export default class QtSlider extends React.Component<QtSliderProps> {
  render() {
    return (
      <Slider
        size="small"
        value={this.props.value}
        max={this.props.max}
        sx={{
          color: "rgba(0,0,0,0.87)",
          height: 4,
          "& .MuiSlider-thumb": {
            display: "none",
          },
          "& .MuiSlider-rail": {
            opacity: 0.0,
          },
          cursor: "default",
        }}
      />
    );
  }
}

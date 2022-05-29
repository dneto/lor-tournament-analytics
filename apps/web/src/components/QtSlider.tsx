import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

type QtSliderProps = {
  value: number;
  max: number;
  textValue: number;
};

export default class QtSlider extends React.Component<QtSliderProps> {
  render() {
    return (
      <Box component="span">
        <Box
          component="span"
          sx={{
            display: "inline-block",
            position: "relative",
            width: `${(this.props.value / this.props.max) * 100}%`,
            color: "rgba(0,0,0,0.87)",
          }}
        >
          <Box
            component="span"
            sx={{ display: "inline-flex", width: "100%", alignItems: "center" }}
          >
            <Box
              component="div"
              flexGrow={1000}
              sx={{
                position: "relative",
                backgroundColor: "currentcolor",
                borderRadius: "12px",
                height: "8px",
                marginRight: "10px",
              }}
            ></Box>
            <Box
              flexGrow={0}
              component="span"
              sx={{
                position: "relative",
              }}
            >
              <Typography variant="h6">{this.props.textValue}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

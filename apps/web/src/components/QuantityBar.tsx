import { withTheme } from "@emotion/react";
import { Theme } from "@material-ui/core";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

type QuantityBarProps = {
  value: number;
  max: number;
  textValue: number;
  theme: Theme;
};

class quantityBar extends React.Component<QuantityBarProps> {
  render() {
    return (
      <Box component="span">
        <Box
          component="span"
          sx={{
            display: "inline-block",
            position: "relative",
            width: `${(this.props.value / this.props.max) * 100}%`,
            color: this.props.theme.palette.text.primary,
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

export default withTheme(quantityBar);

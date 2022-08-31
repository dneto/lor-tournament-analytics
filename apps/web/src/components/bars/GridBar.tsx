import QuantityBar from "@/components/QuantityBar";
import { Grid } from "@mui/material";
import * as React from "react";

type BarProps = {
  value: number;
  max: number;
  textValue: number;
  children?: React.ReactNode;
};

export default class GridBar extends React.Component<BarProps> {
  render() {
    return (
      <>
        <Grid item xs={12} sx={{ marginBottom: "-5px" }}>
          {this.props.children}
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "5px" }}>
          <QuantityBar
            value={this.props.value}
            max={this.props.max}
            textValue={this.props.textValue}
          />
        </Grid>
      </>
    );
  }
}

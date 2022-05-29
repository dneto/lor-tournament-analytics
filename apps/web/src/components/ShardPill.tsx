import { Box, Typography } from "@mui/material";
import { Component } from "react";

type Props = {
  shard: string;
  color: string;
};

export default class ShardPill extends Component<Props> {
  render() {
    return (
      <Box
        sx={{
          borderRadius: "10%",
          backgroundColor: this.props.color,
          padding: "0px 4px",
          color: "white",
          textAlign: "center",
          display: "inline-block",
        }}
      >
        <Typography fontWeight={700}>{this.props.shard}</Typography>
      </Box>
    );
  }
}

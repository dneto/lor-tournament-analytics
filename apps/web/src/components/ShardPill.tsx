import { Box, Typography } from "@mui/material";
import { Component } from "react";
import LanguageIcon from "@mui/icons-material/LanguageSharp";
type Props = {
  shard: string;
};

export default class ShardPill extends Component<Props> {
  render() {
    return (
      <Box
        sx={{
          textAlign: "left",
          alignContent: "center",
          alignSelf: "center",
          display: "flex",
        }}
      >
        <LanguageIcon sx={{ fontSize: "1.2rem", alignSelf: "center" }} />
        <Typography
          fontWeight={700}
          fontSize="0.9rem"
          sx={{ alignSelf: "center", paddingLeft: "2px" }}
        >
          {this.props.shard}
        </Typography>
      </Box>
    );
  }
}

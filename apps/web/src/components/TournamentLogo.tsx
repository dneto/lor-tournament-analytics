import { Box } from "@mui/material";
import * as React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { InferSchemaType } from "mongoose";
import { Tournament } from "@lor-analytics/db";
import { ITournament } from "../../../../packages/db/src/models/tournament";

type TournamentLogoProps = {
  tournament: ITournament;
};

class TournamentLogo extends React.Component<TournamentLogoProps> {
  render(): React.ReactNode {
    return (
      <Box
        paddingTop={0}
        padding={1}
        sx={{ justifyContent: "center", alignContent: "center" }}
      >
        {this.props.tournament?.logo_url ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
            }}
            width="32px"
            height="32px"
          >
            <img
              src={this.props.tournament.logo_url}
              style={{
                objectFit: "cover",
                width: "32px",
                height: "32px",
                borderRadius: "5px",
              }}
            ></img>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
            }}
            width="32px"
            height="32px"
            bgcolor="#111213"
          >
            <EmojiEventsIcon
              style={{
                width: "24px",
                height: "24px",
                fill: "#fafafa",
              }}
            />
          </Box>
        )}
      </Box>
    );
  }
}

export default TournamentLogo;

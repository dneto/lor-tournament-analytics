import { withTheme } from "@emotion/react";
import { Theme } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import TournamentLogo from "./TournamentLogo";
import { Tournament } from "@lor-analytics/db";
import { InferSchemaType } from "mongoose";
import { ITournament } from "../../../../packages/db/src/models/tournament";

type TournamentTitleProps = {
  tournament: ITournament;
  theme: Theme;
};

class TournamentTitle extends React.Component<TournamentTitleProps> {
  render(): React.ReactNode {
    return (
      <>
        {this.props.tournament ? (
          <Box display={"flex"}>
            <TournamentLogo tournament={this.props.tournament} />
            <Box paddingTop={0} padding={1}>
              <Typography
                variant="h6"
                sx={{ color: this.props.theme.palette.text.primary }}
              >
                {this.props.tournament.title}
              </Typography>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default withTheme(TournamentTitle);

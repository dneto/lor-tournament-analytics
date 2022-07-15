import { Tournament } from "@lor-analytics/data-extractor/tournament";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import TournamentLogo from "./TournamentLogo";

type TournamentTitleProps = {
  tournament: Tournament;
};

class TournamentTitle extends React.Component<TournamentTitleProps> {
  render(): React.ReactNode {
    return (
      <>
        {this.props.tournament ? (
          <Box display={"flex"}>
            <TournamentLogo tournament={this.props.tournament} />
            <Box paddingTop={0} padding={1}>
              <Typography variant="h6">
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

export default TournamentTitle;

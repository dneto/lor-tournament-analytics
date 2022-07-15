import * as React from "react";
import { Deck } from "@lor-analytics/deck-utils";
import ChampionIcon from "./ChampionIcon";
import RegionIcon from "./RegionIcon";
import { Box } from "@mui/material";
type ChampionIconProps = {
  deck: Deck;
  style?: React.CSSProperties;
};

const imgStyle: React.CSSProperties = {
  marginLeft: "2px",
  marginRight: "2px",
};

class ArchetypeIcon extends React.Component<ChampionIconProps> {
  render() {
    return (
      <Box>
        {this.props.deck.champions.map((c) => (
          <ChampionIcon
            key={`${c.cardCode}`}
            championCard={c}
            style={{ ...imgStyle }}
          />
        ))}
        {this.props.deck.regions.map((reg) => (
          <RegionIcon region={reg} style={{ ...imgStyle }} />
        ))}
      </Box>
    );
  }
}

export default ArchetypeIcon;
